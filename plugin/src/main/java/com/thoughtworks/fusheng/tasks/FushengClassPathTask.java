package com.thoughtworks.fusheng.tasks;

import java.io.File;
import java.util.Set;
import org.gradle.api.tasks.TaskAction;

public class FushengClassPathTask extends FushengBaseTask {
    @TaskAction
    public void runTask() {
        super.loadClassPath();
        final ClassLoader currentClassLoader = getClass().getClassLoader();
        System.out.println("current classloader  is= " + currentClassLoader);

        Set<File> files = getFushengClassPath().getFiles();
        System.out.println("files in current classpath listed as below");
        files.stream()
                .filter(file -> !file.toString().contains("caches"))
                .forEach(file -> System.out.println(file));
    }
}
