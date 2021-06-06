package fusheng;

import org.gradle.testfixtures.ProjectBuilder;
import org.gradle.api.Project;
import org.junit.Test;
import static org.junit.Assert.*;

public class FushengPluginTest {
    @Test
    public void pluginRegistersATask() {
        Project project = ProjectBuilder.builder().build();
        project.getPlugins().apply("fusheng");

        assertNotNull(project.getTasks().findByName("startLivingDoc"));
        assertNotNull(project.getTasks().findByName("stopLivingDoc"));
    }
}
