package beans;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table (name = "entries")
public class PointEntry implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "x")
    private double x;
    @Column(name = "y")
    private double y;
    @Column(name = "r")
    private double r;
    @Column(name = "time")
    private String currentTime;
    @Column(name = "hit")
    private boolean hit;

    public PointEntry() {
        this(0, 0, 0, "", false);
    }

    public PointEntry(double x, double y, double r) {
        this(x, y, r, "", false);
    }
    public PointEntry(double x, double y, double r, String currentTime, boolean hit) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.currentTime = currentTime;
        this.hit = hit;
    }

    public boolean checkHit() {
        return isTriangleHit() || isCircleHit() || isRectangleHit();
    }

    private boolean isRectangleHit() {
        return x >= 0 && y >= 0 && x <= r / 2 && y <= r;
    }

    private boolean isCircleHit() {
        return x >= 0 && y <= 0 && (x*x + y*y <= r*r);
    }

    private boolean isTriangleHit() {
        return x <= 0 && y >= 0 && y <= 0.5 * x + r / 2;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public String getCurrentTime() {
        return currentTime;
    }

    public void setCurrentTime(String currentTime) {
        this.currentTime = currentTime;
    }

    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

    @Override
    public String toString() {
        return "PointEntry{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", currentTime='" + currentTime + '\'' +
                ", isHit=" + hit +
                '}';
    }
}
