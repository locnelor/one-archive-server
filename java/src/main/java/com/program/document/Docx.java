package com.program.document;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

public class Docx {
    private final File[] files;

    public static boolean isSuffix(File file) {
        if (!file.isFile()) return false;
        String name = file.getName();
        return name.substring(name.lastIndexOf(".")).equals(".docx");
    }

    public static List<File> getFiles(File file) {
        List<File> files = new ArrayList<>();
        if (file.isFile()) {
            if (isSuffix(file)) {
                files.add(file);
            }
            return files;
        }
        File[] arr = file.listFiles();
        if (arr == null) return files;
        for (File f : arr) {
            if (f.isDirectory()) {
                files.addAll(getFiles(f.getAbsoluteFile()));
                continue;
            }
            if (isSuffix(f)) files.add(f);
        }
        return files;
    }

    public Docx(String path) {
        this.files = getFiles(new File(path)).toArray(new File[0]);
    }

    public StringBuilder foreach(Callback callback) {
        StringBuilder builder = new StringBuilder();
        for (File file : this.files) {
            builder.append(file.getAbsolutePath()).append("  ");
            try {
                Event e = new Event(file);
                builder.append(callback.run(e));
                e.save();
            } catch (IOException | ParseException e) {
                builder.append(e.getMessage());
            }
            builder.append("\n");
        }
        return builder;
    }
}
