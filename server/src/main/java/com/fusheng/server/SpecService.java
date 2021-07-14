package com.fusheng.server;

import com.fusheng.server.config.ServerConfig;
import com.fusheng.server.exception.FilesReadingFailedException;
import com.fusheng.server.outbound.Runner;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
public class SpecService {
    private final Runner runner;

    public List<String> findAllExperiments() {
        Path path = Paths.get(System.getProperty("user.dir"), "build", "reports", "tests", "fusheng", "experiment");
        return readFilesByPath(path);
    }

    public List<String> findAllReports() {
        Path path = Paths.get(System.getProperty("user.dir"), "build", "reports", "tests", "fusheng", "result");
        return readFilesByPath(path);
    }

    public String findExperimentByPathName(String pathName) {
        Path path = Paths.get(System.getProperty("user.dir"), "build", "reports", "tests", "fusheng", "result", pathName);
        try {
            return Files.readString(path, StandardCharsets.UTF_8);
        } catch (IOException ex) {
            throw new FilesReadingFailedException("File(" + pathName + ")reading failed.");
        }
    }

    public String runExperiment(String pathName, String htmlContent) {
        // TODO: 2021/7/13 integrate with Runner
        return runner.runExperiment(pathName, htmlContent);
    }

    private List<String> readFilesByPath(Path path) {
        File folder = new File(path.toString());
        File[] listOfFiles = folder.listFiles();

        if (listOfFiles != null && listOfFiles.length > 0) {
            List<String> reports = new ArrayList<>();
            try {
                for (File file : listOfFiles) {
                    if (file.isFile()) {
                        String text = Files.readString(Path.of(file.getPath()), StandardCharsets.UTF_8);
                        reports.add(text);
                    }
                }
            } catch (IOException ex) {
                throw new FilesReadingFailedException("Files reading failed.");
            }
            return reports;
        } else {
            return Collections.emptyList();
        }
    }
}
