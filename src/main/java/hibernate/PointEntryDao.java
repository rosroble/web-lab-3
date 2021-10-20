package hibernate;

import beans.PointEntry;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.ArrayList;
import java.util.List;

public class PointEntryDao {

    private SessionFactory factory;
    public PointEntryDao() {
        factory = HibernateUtil.getSessionFactory();
    }

    public PointEntry getById(Long id) {
        return factory.openSession().get(PointEntry.class, id);
    }

    public void save(PointEntry entry) {
        Session session = factory.openSession();
        Transaction transaction = session.beginTransaction();
        session.save(entry);
        transaction.commit();
        session.close();
    }

    public List<PointEntry> getAll() {
        Session session = factory.openSession();
        return session.createQuery("SELECT p FROM " + PointEntry.class.getSimpleName() + " p",
                PointEntry.class).getResultList();
    }
}
