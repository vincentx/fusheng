package com.fusheng.server.repository;

import com.fusheng.server.config.ServerConfig;
import com.fusheng.server.exception.FilesReadingFailedException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ExperimentRepository {
    private static final String PROJECT_ROOT_DIRECTORY = System.getProperty("user.dir");
    private static final String REPORT_SUFFIX = ".html";
    private final ServerConfig serverConfig;

    public List<String> retrieveExperimentHistoryForSpec(final String pathName) {
        Path path = Paths.get(PROJECT_ROOT_DIRECTORY, serverConfig.getExperimentFolderLocation());
        try (Stream<Path> paths = Files.walk(path)) {
            return paths
                    .filter(Files::isRegularFile)
                    .filter(filePath -> filePath.getFileName().toString().startsWith(pathName))
                    .map(filePath -> filePath.getFileName()
                            .normalize()
                            .toString()
                            .replace(REPORT_SUFFIX, ""))
                    .collect(Collectors.toList());

        } catch (IOException e) {
            throw new FilesReadingFailedException("Files not found");
        }
    }

    public String retrieveSingleExperimentResult(final String experimentPathName) {
        Path path = Paths.get(PROJECT_ROOT_DIRECTORY, serverConfig.getExperimentFolderLocation(), experimentPathName + REPORT_SUFFIX);
        try {
            return Files.readString(path, StandardCharsets.UTF_8);
        } catch (IOException exp) {
            throw new FilesReadingFailedException("File not found");
        }
    }
}
