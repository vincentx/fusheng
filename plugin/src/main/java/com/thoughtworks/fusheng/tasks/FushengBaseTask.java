package com.thoughtworks.fusheng.tasks;

import java.net.MalformedURLException;
import org.gradle.api.DefaultTask;
import org.gradle.api.file.FileCollection;
import org.gradle.api.tasks.Classpath;
import org.gradle.internal.classloader.VisitableURLClassLoader;

public class FushengBaseTask extends DefaultTask {
    private FileCollection fushengClasspath;

    @Classpath
    public FileCollection getFushengClassPath() {
        return fushengClasspath;
    }

    public void setFushengClasspath(FileCollection fushengClasspath) {
        this.fushengClasspath = fushengClasspath;
    }

    public void loadClassPath() {
        final VisitableURLClassLoader gradleDefaultClassLoader = (VisitableURLClassLoader) getClass().getClassLoader();
        getFushengClassPath()
                .filter(file -> !file.toString().contains("caches"))
                .forEach(file -> {
                    try {
                        gradleDefaultClassLoader.addURL(file.toURI().toURL());
                    } catch (MalformedURLException exp) {
                        exp.printStackTrace();
                    }
                });
    }
}
