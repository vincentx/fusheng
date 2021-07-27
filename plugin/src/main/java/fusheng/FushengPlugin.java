package fusheng;

import fusheng.tasks.FushengClassPathTask;
import fusheng.tasks.FushengServerTask;
import org.gradle.api.Plugin;
import org.gradle.api.Project;
import org.gradle.api.file.FileCollection;
import org.gradle.api.plugins.JavaPluginConvention;
import org.gradle.api.tasks.SourceSet;

import java.util.Objects;

public class FushengPlugin implements Plugin<Project> {

    public void apply(Project project) {
        JavaPluginConvention javaPluginConvention = project
                .getConvention()
                .findPlugin(JavaPluginConvention.class);

        FileCollection fushengClasspath = Objects.requireNonNull(javaPluginConvention)
                .getSourceSets()
                .getByName(SourceSet.TEST_SOURCE_SET_NAME)
                .getRuntimeClasspath();

        project.getTasks().register("startLivingDoc", FushengServerTask.class, task -> {
            task.setGroup("fusheng");
            task.setFushengClasspath(fushengClasspath);
        });

        project.getTasks().register("fushengClasspath", FushengClassPathTask.class, task -> {
            task.setGroup("fusheng");
            task.setFushengClasspath(fushengClasspath);
        });
    }
}
