package fusheng.repository;

import fusheng.config.ServerConfig;
import fusheng.exception.FilesReadingFailedException;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RequiredArgsConstructor
public class SpecRepository {
    public static final String PROJECT_ROOT_DIRECTORY = System.getProperty("user.dir");
    private static final String REPORT_SUFFIX = ".html";
    private final ServerConfig serverConfig;

    public String retrieveSpec(String pathName) {
        Path path = Paths.get(PROJECT_ROOT_DIRECTORY, serverConfig.getRawSpecFolderLocation(), pathName + REPORT_SUFFIX);
        try {
            return Files.readString(path, StandardCharsets.UTF_8);
        } catch (IOException exp) {
            throw new FilesReadingFailedException("File not found");
        }
    }

}
