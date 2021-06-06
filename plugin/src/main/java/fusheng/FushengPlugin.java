package fusheng;

import java.io.IOException;
import java.text.MessageFormat;
import org.apache.log4j.Logger;
import org.gradle.api.Plugin;
import org.gradle.api.Project;

public class FushengPlugin implements Plugin<Project> {
    private static final Logger log = Logger.getLogger(FushengPlugin.class);

    public void apply(Project project) {
        final var server = new FushengServer();
        project.getTasks().register("startLivingDoc", task -> task.doLast(s -> runServer(server)));

        project.getTasks().register("stopLivingDoc", task -> task.doLast(s -> server.stopServer()));
    }

    private void runServer(final FushengServer server) {
        try {
            server.startServer();
        } catch (IOException e) {
            log.error(MessageFormat.format("error encountered! message: {0}, cause: {1}", e.getMessage(), e.getCause()));
        }
    }
}
