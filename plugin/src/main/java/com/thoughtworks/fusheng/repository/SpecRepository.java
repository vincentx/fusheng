package com.thoughtworks.fusheng.repository;

import com.thoughtworks.fusheng.config.ServerConfig;
import com.thoughtworks.fusheng.exception.FilesReadingFailedException;
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
        String fileName = pathName.substring(pathName.lastIndexOf(".") + 1);
        Path path = Paths.get(PROJECT_ROOT_DIRECTORY, serverConfig.getRawSpecFolderLocation(), fileName + REPORT_SUFFIX);
        try {
            return Files.readString(path, StandardCharsets.UTF_8);
        } catch (IOException exp) {
            throw new FilesReadingFailedException("File not found");
        }
    }

}
