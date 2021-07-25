package fusheng.server.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "fusheng.server")
@Getter
@Setter
public class ServerConfig {
    private String rawSpecFolderLocation;
    private String reportFolderLocation;
    private String experimentFolderLocation;
}
