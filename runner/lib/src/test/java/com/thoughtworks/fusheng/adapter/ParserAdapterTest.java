package com.thoughtworks.fusheng.adapter;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.Map;

import com.thoughtworks.fusheng.executor.StdLib;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;

class ParserAdapterTest {

    private class MockedFixture {
        public String getName() {
            return "test";
        }
    }

    @Test
    void getJsCode() {
        String html = "<html lang=\"en\">\n" +
                "<head>\n" +
                "  <meta charset=\"UTF-8\"/>\n" +
                "  <title>伏生Spec</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "  <p>伏生测试Spec用例！</p>\n" +
                "  <p>你知道伏生是谁吗？</p>\n" +
                "  <div class=\"example\">\n" +
                "    <p>是一个历史名人的老师哦</p>\n" +
                "    <span class=\"assertion\" data-expect=\"equal\" data-action=\"getName\">司马迁</span>\n" +
                "  </div>\n" +
                "</body>\n" +
                "</html>";
        Document document = Jsoup.parse(html);
        String expected = "var expect;var actual;var result;context[\"mock_uuid\"] = true;actual = fixture.getName();expect = \"司马迁\";result = actual === expect;$.getElementById(\"mock_uuid\").addClass(result ? \"success\" : \"error\");context[\"mock_uuid\"] = context[\"mock_uuid\"] && result;$.getElementById(\"mock_uuid\").children()[1].setText(actual);";

        try (MockedStatic<StdLib> utilities = mockStatic(StdLib.class)) {
            utilities.when(StdLib::uuid).thenReturn("mock_uuid");

            ParserAdapter parserAdapter = ParserAdapter.getInstance();
            parserAdapter.getExecutor().setSymbol("fixture", new MockedFixture());

            Map<String, String> jsCode = parserAdapter.getJsCode(document);

            assertEquals(expected, jsCode.values().toArray()[0]);
        }
    }
}
