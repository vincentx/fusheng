package fusheng.outbound;

import fusheng.runner.adapter.ServerAdapter;

public class Runner {
    public String runExperiment(String pathName, String htmlContent) {
        try {
            return ServerAdapter.runExperiment("", "");
        }catch (Exception e){
            e.printStackTrace();
        }
        return "something went wrong, not integrate.";
    }
}
