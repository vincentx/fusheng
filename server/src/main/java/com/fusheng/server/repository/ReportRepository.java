package com.fusheng.server.repository;

import com.fusheng.server.config.ServerConfig;
import com.fusheng.server.exception.FilesReadingFailedException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Repository
@RequiredArgsConstructor
public class ReportRepository {
    public static final String PROJECT_ROOT_DIRECTORY = System.getProperty("user.dir");
    private static final String REPORT_SUFFIX = ".html";
    private final ServerConfig serverConfig;

    public String retrieve(String pathName) {
        Path path = Paths.get(PROJECT_ROOT_DIRECTORY, serverConfig.getReportFolderLocation(), pathName + REPORT_SUFFIX);
        try {
            return Files.readString(path, StandardCharsets.UTF_8);
        } catch (IOException exp) {
            throw new FilesReadingFailedException("File not found");
        }
    }
}
