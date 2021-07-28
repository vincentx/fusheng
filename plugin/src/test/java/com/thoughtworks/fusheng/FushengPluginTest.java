package fusheng;

import static org.junit.Assert.assertNotNull;

import org.gradle.api.Project;
import org.gradle.testfixtures.ProjectBuilder;
import org.junit.Test;

public class FushengPluginTest {
    @Test
    public void pluginRegistersATask() {
        Project project = ProjectBuilder.builder().build();
        project.getPlugins().apply("fusheng");

        assertNotNull(project.getTasks().findByName("startLivingDoc"));
        assertNotNull(project.getTasks().findByName("stopLivingDoc"));
    }
}
