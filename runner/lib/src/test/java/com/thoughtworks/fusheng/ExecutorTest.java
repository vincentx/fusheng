package com.thoughtworks.fusheng;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import com.google.common.collect.ImmutableMap;
import com.thoughtworks.fusheng.executor.Executor;
import com.thoughtworks.fusheng.executor.ExecutorFactory;
import com.thoughtworks.fusheng.executor.StdEnvironment.Context;
import java.util.Map;
import org.junit.jupiter.api.Test;

class ExecutorTest {

    public static class MockedFixture {

        public int intField = 1;

        public int add(int lhs, int rhs) {
            return lhs + rhs;
        }
    }

    @Test
    void should_exec_js_code_with_given_symbol_success() {
        Executor executor = ExecutorFactory.getExecutor("javascript", "");

        ImmutableMap<String, Object> symbols = ImmutableMap.of("fixture", new MockedFixture());
        String jsCode = "c = fixture.add(2, 3);";

        Context ctx = executor.exec(symbols, jsCode);
        int result = ctx.get("c");

        assertEquals(5, result);
    }

    @Test
    void should_exec_js_and_set_context_success() {

        Executor executor = ExecutorFactory.getExecutor("javascript", "");

        ImmutableMap<String, Object> symbols = ImmutableMap.of("fixture", new MockedFixture());
        String jsCode = "context.result = fixture.add(5, 3);";

        Context ctx = executor.exec(symbols, jsCode);
        Map<String, Object> context = ctx.get("context");

        assertEquals(8, context.get("result"));
    }

    @Test
    void should_exec_js_and_get_nested_context_by_jsonpath_success() {

        Executor executor = ExecutorFactory.getExecutor("javascript", "");

        String ctxString =
            "        {\"expect\": {\n" +
                "            \"value\": 1,\n" +
                "            \"class\": [\"assert-expect\", \"error\"]\n" +
                "        },\n" +
                "        \"actual\": {\n" +
                "            \"value\": 2,\n" +
                "            \"class\": [\"assert-actual\", \"visible\"]\n" +
                "        }\n" +
                "    }";

        ImmutableMap<String, Object> symbols = ImmutableMap.of("fixture", new MockedFixture());
        String jsCode = String.format("context.uuid1 = %s;", ctxString);

        Context ctx = executor.exec(symbols, jsCode);
        int value = ctx.getContext("$.uuid1.expect.value");

        assertEquals(1, value);
    }

    @Test
    void should_return_null_while_path_not_exists() {

        Executor executor = ExecutorFactory.getExecutor("javascript", "");

        String ctxString =
            "        {\"expect\": {\n" +
                "            \"value\": 1,\n" +
                "            \"class\": [\"assert-expect\", \"error\"]\n" +
                "        },\n" +
                "        \"actual\": {\n" +
                "            \"value\": 2,\n" +
                "            \"class\": [\"assert-actual\", \"visible\"]\n" +
                "        }\n" +
                "    }";

        ImmutableMap<String, Object> symbols = ImmutableMap.of("fixture", new MockedFixture());
        String jsCode = String.format("context.uuid1 = %s;", ctxString);

        Context ctx = executor.exec(symbols, jsCode);
        assertNull(ctx.getContext("$.uuid1.expect.data"));
    }
}