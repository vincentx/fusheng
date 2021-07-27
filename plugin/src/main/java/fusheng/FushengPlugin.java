package fusheng;

import org.gradle.api.Plugin;
import org.gradle.api.Project;

public class FushengPlugin implements Plugin<Project> {

    public void apply(Project project) {
        project.getTasks().register("startLivingDoc", task -> task.doLast(s -> runServer()));
    }

    private void runServer() {
        final var server = new FushengServer();
        try {
            server.startServer();
            Thread.sleep( 60000 );
        }
        catch(Exception e) {
            e.printStackTrace();
        }finally {
            server.stopServer();
        }
    }
}
