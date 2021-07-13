package com.fusheng.server;

import com.fusheng.server.exception.FilesReadingFailedException;
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

@Service
public class SpecService {
    public List<String> findAllExperiments() {
        Path path = Paths.get(System.getProperty("user.dir"), "build", "reports", "tests", "fusheng", "experiment");
        return readFilesByPath(path);
    }

    public List<String> findAllReports() {
        Path path = Paths.get(System.getProperty("user.dir"), "build", "reports", "tests", "fusheng", "result");
        return readFilesByPath(path);
    }

    public String findReportByPathName(String pathName) {
        Path path = Paths.get(System.getProperty("user.dir"), "build", "reports", "tests", "fusheng", "result", pathName);
        try {
            return Files.readString(path, StandardCharsets.UTF_8);
        } catch (IOException ex){
            throw new FilesReadingFailedException("File(" + pathName + ")reading failed.");
        }
    }

    private List<String> readFilesByPath(Path path) {
        File folder = new File(path.toString());
        File[] listOfFiles = folder.listFiles();

        if (listOfFiles != null && listOfFiles.length > 0){
            List<String> reports = new ArrayList<>();
            try {
                for (File file : listOfFiles) {
                    if (file.isFile()) {
                        String text = Files.readString(Path.of(file.getPath()), StandardCharsets.UTF_8);
                        reports.add(text);
                    }
                }
            } catch (IOException ex){
                throw new FilesReadingFailedException("Files reading failed.");
            }
            return reports;
        } else {
            return Collections.emptyList();
        }
    }
}
