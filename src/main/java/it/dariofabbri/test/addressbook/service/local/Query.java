package it.dariofabbri.test.addressbook.service.local;

import org.hibernate.ScrollMode;
import org.hibernate.ScrollableResults;
import org.hibernate.Session;

public abstract class Query<T> {

	private Integer offset;
	private Integer limit;

	protected Session session;

	public Query(Session session) {

		this.session = session;

		offset = 0;
		limit = 10;
	}

	public ScrollableResults scroll() {
		
		// Check query arguments.
		//
		if (!checkQueryArguments())
			throw new IllegalArgumentException();

		// Get query HQL from concrete class implementation.
		//
		String queryHql = getQueryHql();
		
		// Create Hibernate query and set query limits.
		//
		org.hibernate.Query q = session.createQuery(queryHql);
		setQueryLimits(q);
		
		// Set query arguments using concrete class implementation.
		//
		setQueryArguments(q);
		
		// Return results.
		//
		return q.scroll(ScrollMode.FORWARD_ONLY);
	}

	@SuppressWarnings("unchecked")
	public QueryResult<T> query() {
		
		// Check query arguments.
		//
		if (!checkQueryArguments())
			throw new IllegalArgumentException();

		// Initialize query result object. As a convention,
		// this carries also query limits information.
		//
		QueryResult<T> result = new QueryResult<T>();
		result.setLimit(limit);
		result.setOffset(offset);
		
		// Hibernate query object.
		//
		org.hibernate.Query q;

		// Count the query results.
		//
		String countHql = getCountHql();
		q = session.createQuery(countHql);
		setQueryArguments(q);
		Object o = q.uniqueResult();

		// Resolve count object to a primitive integer type,
		// accordingly with returned type (this one may differ
		// depending on the underlying RDBMS).
		//
		int records = 0;
		if (o instanceof Integer)
			records = ((Integer) o).intValue();
		else if (o instanceof Long)
			records = ((Long) o).intValue();
		else
			throw new IllegalArgumentException(
				"Unexpected type found when counting query.");

		// Set the number of records in the result object.
		//
		result.setRecords(records);

		// If no items will be returned by the query,
		// we spare the effort of querying.
		//
		if (records <= 0)
			return result;

		// Execute the query.
		//
		String queryHql = getQueryHql();
		q = session.createQuery(queryHql);
		setQueryLimits(q);
		setQueryArguments(q);
		result.setResults(q.list());
		
		// Return the results.
		//
		return result;
	}

	private void setQueryLimits(org.hibernate.Query q) {
		
		if(offset != null && offset >= 0)
			q.setFirstResult(offset);

		if (limit != null && limit >= 0)
			q.setMaxResults(limit);
	}


	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public Integer getOffset() {
		return offset;
	}

	public void setOffset(Integer offset) {
		this.offset = offset;
	}

	protected abstract boolean checkQueryArguments();

	protected abstract String getCountHql();

	protected abstract String getQueryHql();

	protected abstract void setQueryArguments(org.hibernate.Query q);
}
