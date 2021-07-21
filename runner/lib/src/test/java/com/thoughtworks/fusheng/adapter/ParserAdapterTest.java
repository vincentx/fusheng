package com.thoughtworks.fusheng.adapter;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.google.common.collect.ImmutableMap;
import com.thoughtworks.fusheng.executor.Executor;
import java.util.Map;
import org.junit.jupiter.api.Test;

class ParserAdapterTest {

    @Test
    void getJsCode() {
        Map<Object, Object> mockedJsCode = ImmutableMap.of();
        Executor executor = mock(Executor.class);
        when(executor.invoke("getJsCode")).thenReturn(mockedJsCode);

        ParserAdapter javascript = new ParserAdapter("javascript", null);
        javascript.setExecutor(executor);

        Map<String, String> jsCode = javascript.getJsCode();

        assertEquals(mockedJsCode, jsCode);
    }
}
