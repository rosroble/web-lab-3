package beans;


import hibernate.PointEntryDao;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class EntriesBean implements Serializable {
    private PointEntry entry;
    private PointEntry canvasEntry;
    private PointEntryDao pointDao;
    private List<PointEntry> entries;


    public EntriesBean() {
        pointDao = new PointEntryDao();
        entries = pointDao.getAll();
        entry = new PointEntry();
        canvasEntry = new PointEntry();
    }

    public String addEntry() {
        entry.setHit(entry.checkHit());
        entry.setCurrentTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        entries.add(entry);
        pointDao.save(entry);
        entry = new PointEntry(entry.getX(), entry.getY(), entry.getR());
        return null;
    }

    public String addCanvasEntry() {
        canvasEntry.setHit(canvasEntry.checkHit());
        canvasEntry.setCurrentTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        System.out.println(canvasEntry);
        entries.add(canvasEntry);
        pointDao.save(canvasEntry);
        canvasEntry = new PointEntry(canvasEntry.getX(), canvasEntry.getY(), canvasEntry.getR());
        return null;
    }

    private void truncateEntry(PointEntry entry) {
        entry.setX(truncateDouble(entry.getX(), 5));
        entry.setY(truncateDouble(entry.getY(), 5));
    }
    private Double truncateDouble(double valueToTruncate, int decimalPlaces) {
        return BigDecimal.valueOf(valueToTruncate).setScale(decimalPlaces, RoundingMode.HALF_UP).doubleValue();
    }


    public PointEntry getEntry() {
        return entry;
    }

    public List<PointEntry> getEntries() {
        return entries;
    }

    public void setEntries(List<PointEntry> entries) {
        this.entries = entries;
    }

    public PointEntry getCanvasEntry() {
        return canvasEntry;
    }

    public void setCanvasEntry(PointEntry canvasEntry) {
        this.canvasEntry = canvasEntry;
    }
}
