package fusheng.tasks;

import org.gradle.api.DefaultTask;
import org.gradle.api.file.FileCollection;
import org.gradle.api.tasks.Classpath;

public class FushengBaseTask extends DefaultTask {
    private FileCollection fushengClasspath;

    @Classpath
    public FileCollection getFushengClassPath() {
        return fushengClasspath;
    }

    public void setFushengClasspath(FileCollection fushengClasspath) {
        this.fushengClasspath = fushengClasspath;
    }
}
