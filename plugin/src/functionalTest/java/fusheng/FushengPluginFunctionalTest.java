package fusheng;

import static org.gradle.internal.impldep.org.hamcrest.CoreMatchers.equalTo;
import static org.gradle.internal.impldep.org.hamcrest.CoreMatchers.is;
import static org.gradle.internal.impldep.org.hamcrest.MatcherAssert.assertThat;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.nio.file.Files;
import org.gradle.testkit.runner.BuildResult;
import org.gradle.testkit.runner.GradleRunner;
import org.junit.Test;

public class FushengPluginFunctionalTest {
    @Test
    public void canRunTask() throws IOException {

        File projectDir = new File("build/functionalTest");
        Files.createDirectories(projectDir.toPath());
        writeString(new File(projectDir, "settings.gradle"), "");
        writeString(new File(projectDir, "build.gradle"),
            "plugins {" +
            "  id('fusheng')" +
            "}");

        // Run the build
        GradleRunner runner = GradleRunner.create();
        runner.forwardOutput();
        runner.withPluginClasspath();
        runner.withArguments("startLivingDoc");
        runner.withProjectDir(projectDir);
        BuildResult result = runner.build();

        final var startLivingDocTask = result.getTasks().get(0);
//        assertThat(startLivingDocTask.getPath(), is(equalTo(":startLivingDoc")));
//        assertThat(startLivingDocTask.getOutcome(), is(equalTo("SUCCESS")));
    }

    private void writeString(File file, String string) throws IOException {
        try (Writer writer = new FileWriter(file)) {
            writer.write(string);
        }
    }
}
