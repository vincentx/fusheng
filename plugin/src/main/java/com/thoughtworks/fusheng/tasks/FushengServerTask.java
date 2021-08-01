package com.thoughtworks.fusheng.tasks;

import com.thoughtworks.fusheng.FushengServer;
import org.gradle.api.tasks.TaskAction;

public class FushengServerTask extends FushengBaseTask {
    @TaskAction
    public void runTask() {
        runServer();
    }

    private void runServer() {
        super.loadClassPath();

        final var server = new FushengServer();
        try {
            server.startServer();
            // TODO: is there better way to keep server running?
            while (true) {

            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            server.stopServer();
        }
    }

}
