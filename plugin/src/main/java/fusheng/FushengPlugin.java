package fusheng;

import java.io.IOException;
import org.apache.log4j.Logger;
import org.gradle.api.Project;
import org.gradle.api.Plugin;

public class FushengPlugin implements Plugin<Project> {
    private static final Logger log = Logger.getLogger(FushengPlugin.class);

    public void apply(Project project) {
        final var server = new FushengServer();
        project.getTasks().register("startLivingDoc", task -> task.doLast(s -> runServer(server)));

        project.getTasks().register("stopLivingDoc", task -> {
            task.doLast(s -> System.out.println("Hello from plugin 'fusheng.stopLivingDoc'"));
        });
    }

    private void runServer(final FushengServer server) {
        try {
            server.startServer();
        } catch (IOException e) {
            log.error("error encountered!");
        }
    }
}
