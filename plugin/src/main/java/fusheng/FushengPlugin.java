package fusheng;

import org.apache.log4j.Logger;
import org.gradle.api.Plugin;
import org.gradle.api.Project;

import java.text.MessageFormat;

public class FushengPlugin implements Plugin<Project> {
    private static final Logger log = Logger.getLogger(FushengPlugin.class);

    public void apply(Project project) {
        project.getTasks().register("startLivingDoc", task -> task.doLast(s -> runServer()));
    }

    private void runServer() {
        try {
            ServerApplication.main(new String[]{});
        } catch (Exception e) {
            log.error(MessageFormat.format("error encountered! message: {0}, cause: {1}", e.getMessage(), e.getCause()));
        }
    }
}
