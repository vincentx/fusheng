package com.thoughtworks.fusheng.executor;

import com.google.common.base.Strings;
import com.thoughtworks.fusheng.exception.ExecutorException;
import com.thoughtworks.fusheng.executor.StdEnvironment.Context;
import java.util.Map;
import javax.script.Invocable;
import javax.script.ScriptContext;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class Executor {

    private static final ScriptEngineManager scriptEngineManager = new ScriptEngineManager();
    private final ScriptEngine engine;

    public Executor(String scripting, Map<String, Object> symbols, String initScript) {
        this.engine = scriptEngineManager.getEngineByName(scripting);

        if (Strings.isNullOrEmpty(initScript)) {
            symbols.forEach(engine::put);
        } else {
            exec(symbols, initScript);
        }
    }

    public void addSymbol(String name, Object obj) {
        engine.put(name, obj);
    }

    public Context exec(Map<String, Object> symbols, String jsCode) {
        symbols.forEach(engine::put);

        try {
            engine.eval(jsCode);
            return Context.of(engine.getBindings(ScriptContext.ENGINE_SCOPE));
        } catch (ScriptException e) {
            throw new ExecutorException(String.format("Run code failed, cause by\n%s", e.getMessage()), e);
        }
    }

    public Object invoke(String methodName, Object... args) {
        Invocable invocable = (Invocable) this.engine;
        try {
            return invocable.invokeFunction(methodName, args);
        } catch (ScriptException | NoSuchMethodException e) {
            throw new ExecutorException(String.format("Run code failed, cause by\n%s", e.getMessage()), e);
        }
    }
}
