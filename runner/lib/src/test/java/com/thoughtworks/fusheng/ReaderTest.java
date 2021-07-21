package com.thoughtworks.fusheng;

import com.thoughtworks.fusheng.exception.ReaderException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ReaderTest {
  @Test
  void should_get_exception_when_receive_a_invalid_path() {
    String invalidPath = "fusheng/spec/invalidPath.html";
    assertThrows(ReaderException.class, () -> Reader.read(invalidPath), "No such file: " + invalidPath);
  }

  @Test
  void should_get_spec_file_content_when_receive_a_valid_path() {
    String expected = "<!DOCTYPE html>\n" +
            "<html lang=\"en\">\n" +
            "<head>\n" +
            "  <meta charset=\"UTF-8\">\n" +
            "  <title>Spec</title>\n" +
            "</head>\n" +
            "<body>\n" +
            "  <p class=\"example\">\n" +
            "    一局游戏有3名玩家\n" +
            "    <span class=\"variable\" data-name=\"players\">A,B,C</span>\n" +
            "  </p>\n" +
            "</body>\n" +
            "</html>\n";
    String actual = Reader.read("fusheng/spec/spec.html");

    assertEquals(expected, actual);
  }

  @Test
  void should_get_spec_html_path_when_receive_a_valid_fixture_path() {
    String expected = "fusheng/spec/spec.html";
    String actual = Reader.getSpecFilePath("spec");

    assertEquals(expected, actual);
  }

  @Test
  void should_get_spec_html_content_when_receive_a_valid_fixture_file_path() {
    String expected = "<!DOCTYPE html>\n" +
            "<html lang=\"en\">\n" +
            "<head>\n" +
            "  <meta charset=\"UTF-8\">\n" +
            "  <title>Spec</title>\n" +
            "</head>\n" +
            "<body>\n" +
            "  <p class=\"example\">\n" +
            "    一局游戏有3名玩家\n" +
            "    <span class=\"variable\" data-name=\"players\">A,B,C</span>\n" +
            "  </p>\n" +
            "</body>\n" +
            "</html>\n";
    String actual = Reader.getSpecByFixture("spec");

    assertEquals(expected, actual);
  }
}
