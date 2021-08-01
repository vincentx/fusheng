package com.thoughtworks.fusheng.config;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServerConfig {
    // TODO: read configuration
    private String rawSpecFolderLocation = "/src/main/resources/specs";
    private String reportFolderLocation = "/src/main/resources/reports";
    private String experimentFolderLocation = "/build/reports/tests/fusheng/experiment";
    private String indexHtmlLocation = "/src/main/resources/index/fusheng-combined.html";
}
