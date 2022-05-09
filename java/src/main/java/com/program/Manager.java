package com.program;

import com.program.document.Callback;
import com.program.document.Docx;
import com.program.document.Event;
import com.program.utils.Judge;
import org.apache.poi.xwpf.usermodel.XWPFTableRow;

import java.io.IOException;
import java.util.ArrayList;

public class Manager {
    public static void main(String[] args) throws IOException {
        switch (args[0]) {
            case "help":
                System.out.println("commands");
                System.out.println("add [endDate] <path>                   update document date to specified date");
                System.out.println("del [startDate] [endDate] <path>       delete from start time to end time");
                System.out.println("rep <path>                             check file format");
                System.out.println("new [startDate] <path> <out path>      clone a new item on a specified date");
                break;
            case "add":
                add(args[1], args[2]);
                break;
            case "del":
                del(args[1], args[2]);
                break;
            case "rep":
                rep(args[1]);
                break;
            case "new":
                create(args[1], args[2], args[3]);
                break;
        }

    }

    public static void rep(String path) throws IOException {
        Docx docx = new Docx(path);
        Event first = docx.getFirst();
        XWPFTableRow current = first.getCurrent();
        String date = current.getCell(0).getText();
        ArrayList<Integer> arr = new ArrayList<>();
        StringBuilder format = new StringBuilder();
        int len = date.length();
        for(int i = 0; i < len; i ++){
            char c = date.charAt(i);
            if(Judge.isNumberChar(c)){
                int j = i + 1;
                for(; j < len; j ++){
                    if(!Judge.isNumberChar(date.charAt(j))){
                        break;
                    }
                }
                arr.add(Integer.parseInt(date.substring(i,j)));
                format.append("{num}");
                i = j - 1;
                continue;
            }
            format.append(date.charAt(i));
        }



    }

    public static void del(String startDate, String endDate) {

    }

    public static void create(String startDate, String path, String outPath) {

    }

    public static void add(String endDate, String path) {
        new Docx(path).foreach(e -> {

            return false;
        });
    }
}
