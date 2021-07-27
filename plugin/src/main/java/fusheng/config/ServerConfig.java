package fusheng.config;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServerConfig {
    // TODO: read configuration
    private String rawSpecFolderLocation = "plugin/src/main/resources/specs";
    private String reportFolderLocation = "plugin/src/main/resources/reports";
    private String experimentFolderLocation = "plugin/src/main/resources/experiments";
    private String indexHtmlLocation = "plugin/src/main/resources/index/fusheng-combined.html";
}
