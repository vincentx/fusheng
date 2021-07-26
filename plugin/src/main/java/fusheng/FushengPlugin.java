package fusheng;

import org.apache.log4j.Logger;
import org.gradle.api.Plugin;
import org.gradle.api.Project;

public class FushengPlugin implements Plugin<Project> {

    public void apply(Project project) {
        final var server = new FushengServer();
        project.getTasks().register("startLivingDoc", task -> task.doLast(s -> runServer(server)));
        project.getTasks().register("stopLivingDoc", task -> task.doLast(s -> server.stopServer()));
        project.getTasks().register("fusheng", task -> task.dependsOn("startLivingDoc").finalizedBy("stopLivingDoc"));
    }

    private void runServer(final FushengServer server) {
        try {
            server.startServer();
            Thread.sleep( 60000 );
        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }
}
