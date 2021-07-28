package com.thoughtworks.fusheng.repository;

import com.thoughtworks.fusheng.config.ServerConfig;
import com.thoughtworks.fusheng.exception.FilesReadingFailedException;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

    public List<String> retrieveAll() {
        Path path = Paths.get(PROJECT_ROOT_DIRECTORY, serverConfig.getReportFolderLocation());
        try (Stream<Path> paths = Files.walk(path)) {
            return paths
                    .filter(Files::isRegularFile)
                    .map(filePath -> filePath.getFileName()
                            .normalize()
                            .toString()
                            .replace(REPORT_SUFFIX, ""))
                    .collect(Collectors.toList());

        } catch (IOException e) {
            throw new FilesReadingFailedException("Files not found");
        }
    }
}
