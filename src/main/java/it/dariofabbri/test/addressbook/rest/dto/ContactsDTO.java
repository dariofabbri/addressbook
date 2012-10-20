package it.dariofabbri.test.addressbook.rest.dto;

import java.util.List;

public class ContactsDTO {

	private Integer page;
	private Integer pageSize;
	private Integer recordsFound;

	private List<ContactDTO> results;

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getRecordsFound() {
		return recordsFound;
	}

	public void setRecordsFound(Integer recordsFound) {
		this.recordsFound = recordsFound;
	}

	public List<ContactDTO> getResults() {
		return results;
	}

	public void setResults(List<ContactDTO> results) {
		this.results = results;
	}
}
