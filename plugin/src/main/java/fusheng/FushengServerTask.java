package fusheng;

import org.gradle.api.tasks.TaskAction;

public class FushengServerTask extends FushengBaseTask {
    @TaskAction
    public void runTask() {
        runServer();
    }

    private void runServer() {
        final var server = new FushengServer();
        try {
            server.startServer();
            Thread.sleep(60000);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            server.stopServer();
        }
    }

}
