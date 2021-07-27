package fusheng;

import org.gradle.api.tasks.TaskAction;

import java.io.File;
import java.util.Set;

public class FushengClassPathTask extends FushengBaseTask {
    @TaskAction
    public void runTask() {
        Set<File> files = getFushengClassPath().getFiles();
        files.stream()
                .filter(file -> !file.toString().contains("caches"))
                .forEach(file -> System.out.println("file = " + file));
    }
}
