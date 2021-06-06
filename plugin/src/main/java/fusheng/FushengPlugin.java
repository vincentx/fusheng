
package fusheng;

import org.gradle.api.Project;
import org.gradle.api.Plugin;

public class FushengPlugin implements Plugin<Project> {
    public void apply(Project project) {
        project.getTasks().register("startLivingDoc", task -> {
            task.doLast(s -> System.out.println("Hello from plugin 'fusheng.startLivingDoc'"));
        });

        project.getTasks().register("stopLivingDoc", task -> {
            task.doLast(s -> System.out.println("Hello from plugin 'fusheng.stopLivingDoc'"));
        });
    }
}
