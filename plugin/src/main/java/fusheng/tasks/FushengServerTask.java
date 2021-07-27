package fusheng.tasks;

import fusheng.FushengServer;
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
            // TODO: is there better way to keep server running?
            while (true){

            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            server.stopServer();
        }
    }

}
