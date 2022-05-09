package com.program.document;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

public class Docx {
    private final File[] files;

    public Docx(String path) {
        File[] files = new File(path).listFiles();
        ArrayList<File> arr = new ArrayList<>();
        assert files != null;
        for (File file : files) {
            if(!file.isFile())continue;
            String name = file.getName();
            if(name.substring(name.lastIndexOf(".")).equals(".docx"))arr.add(file);
        }
        this.files = (File[]) arr.toArray();
    }
    public Event getFirst() throws IOException {
        return new Event(this.files[0]);
    }

    public void foreach(Callback callback) {
        for (File file : this.files) {
            try {
                if (callback.run(new Event(file))) break;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    public void save(){

    }

}
