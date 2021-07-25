package fusheng;

import org.gradle.api.Project;
import org.gradle.testfixtures.ProjectBuilder;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

public class FushengPluginTest {
    @Test
    public void pluginRegistersATask() {
        Project project = ProjectBuilder.builder().build();
        project.getPlugins().apply("fusheng");

        assertNotNull(project.getTasks().findByName("startLivingDoc"));
    }
}
