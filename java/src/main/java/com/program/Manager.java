package com.program;

import com.program.document.Docx;
import com.program.utils.Temperature;
import org.apache.poi.xwpf.usermodel.XWPFTableCell;
import org.apache.poi.xwpf.usermodel.XWPFTableRow;
import org.apache.xmlbeans.XmlException;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

public class Manager {
    public static void main(String[] args) {
        System.out.println(Arrays.toString(args));
        switch (args[0]) {
            case "help":
                System.out.println("commands");
                System.out.println("add [format] [int] <path>                       update document date to specified date");
                System.out.println("rep [format] <path>                             check file format");
//                System.out.println("new [dateString] <path> <out path>              clone a new item on a specified date");
                break;
            case "add":
                add(args[1], args[2], args[3]);
                break;
            case "rep":
                rep(args[1], args[2]);
                break;
            case "new":
                create(args[1], args[2], args[3]);
                break;
        }
    }

    public static boolean parse(String date, SimpleDateFormat sdf) {
        try {
            sdf.parse(date);
        } catch (ParseException e) {
            return false;
        }
        return true;
    }

    public static void rep(String format, String path) {
        Docx docx = new Docx(path);
        StringBuilder str = docx.foreach(e -> {
            StringBuilder result = new StringBuilder();
            List<XWPFTableRow> rows = e.getRows();
            int len = rows.size();
            int i = len - 1;
            for (; i > 0; i--) {
                XWPFTableRow row = rows.get(i);
                XWPFTableCell cell = row.getCell(0);
                String text = cell.getText();
                if (text.equals("日期")) break;
            }
            SimpleDateFormat sdf = new SimpleDateFormat(format);
            String time = rows.get(i).getCell(0).getText();
            if (!parse(time, sdf)) {
                return "该文档日期格式不匹配";
            }
            Calendar cal = Calendar.getInstance();
            cal.setTime(sdf.parse(time));
            for (; i < len; i++, cal.add(Calendar.DATE, 1)) {
                XWPFTableRow row = rows.get(i);
                XWPFTableCell dateCell = row.getCell(0);
                String dateText = dateCell.getText();
                String currentTime = sdf.format(cal.getTime());
                if (!dateText.equals(currentTime)) {
                    result.append(dateText)
                            .append(" 与目标日期 ")
                            .append(currentTime)
                            .append("不符，已强制修改");
                    e.setText(dateCell, currentTime);
                }
                XWPFTableCell cell = row.getCell(1);
                String text = cell.getText();
                String after = Temperature.parse(text);
                if (!text.equals(after)) {
                    result.append(dateText)
                            .append(" 体温格式错误 ")
                            .append(text)
                            .append(" 已强制修改为：")
                            .append(after)
                            .append("");
                }
                e.setText(cell, after);
            }
            return String.valueOf(result);
        });
        System.out.println(str);
    }

    public static void create(String startDate, String path, String outPath) {

    }

    public static void add(String format, String num, String path) {
        StringBuilder str = new Docx(path).foreach(e -> {
            XWPFTableRow row = e.getCurrent();
            SimpleDateFormat sdf = new SimpleDateFormat(format);
            String date = row.getCell(0).getText();
            if (!parse(date, sdf)) {
                return "该文档日期格式不匹配\n";
            }
            Calendar cal = Calendar.getInstance();
            cal.setTime(sdf.parse(date));
            cal.add(Calendar.DATE, 1);
            int day = Integer.parseInt(num);
            try {
                for (int i = 0; i < day; i++, cal.add(Calendar.DATE, 1)) {
                    e.add(sdf.format(cal.getTime()));
                }
            } catch (XmlException | IOException xmlException) {
                return "添加日期失败";
            }
            e.save();
            return "添加成功";
        });
        System.out.println(str);
    }
}
