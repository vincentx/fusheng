package fusheng.config;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServerConfig {
    // TODO: read configuration
    private String rawSpecFolderLocation;
    private String reportFolderLocation;
    private String experimentFolderLocation;
}
