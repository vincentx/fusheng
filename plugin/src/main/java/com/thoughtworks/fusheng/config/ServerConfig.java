package com.thoughtworks.fusheng.config;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServerConfig {
    private String rawSpecFolderLocation = "src/test/resources/fusheng/spec";
    private String reportFolderLocation = "/build/reports/tests/fusheng/result";
    private String experimentFolderLocation = "/build/reports/tests/fusheng/experiment";
    private String indexHtmlLocation = "/src/main/resources/index/fusheng-combined.html";
}
