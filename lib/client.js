/*
Node wrapper for Freshdesk v2 API

Copyright (C) 2016-2019 Arjun Komath <arjunkomath@gmail.com>
Copyright (C) 2016-2018 Maksim Koryukov <maxkoryukov@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the MIT License, attached to this software package.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

You should have received a copy of the MIT License along with this
program. If not, see <https://opensource.org/licenses/MIT>.

http://spdx.org/licenses/MIT
*/

/**
 * A module with the main client-class {@link module:client~Freshdesk}.
 *
 * @module
 * @author Arjun Komath <arjunkomath@gmail.com>
 * @author Maksim Koryukov <maxkoryukov@gmail.com>
 * @author Roniger <https://github.com/roniger>
 */

"use strict";

const utils = require("./utils");
const makeRequest = utils.makeRequest;
const FreshdeskError = utils.FreshdeskError;

/**
 * Freshdesk APIv2 client.
 *
 * @class
 * @public
 */
class Freshdesk {
	/**
	 * This callback is called on API call ended.
	 * @name Freshdesk.requestCallback
	 * @callback Freshdesk.requestCallback
	 * @param {Error}  [error]  Indicates, that error occured during call
	 * @param {Object} [data]   Contains actual data
	 */

	/**
	 * Freshdesk APIv2 client
	 *
	 * @class
	 * @param {string} baseUrl    Base URL for the API calls, for example `https://demo.freshdesk.com`
	 * @param {string} apiKey     API key
	 * @public
	 */
	constructor(baseUrl, apiKey) {
		this.baseUrl = baseUrl;
		this._auth =
			"Basic " + Buffer.from(`${apiKey}:X`, "utf-8").toString("base64");
	}

	/**
	 * Filter-settings for {@link listAllTickets}.
	 *
	 * @name  TicketsFilter
	 *
	 * @typedef  {Object}                   Freshdesk.TicketsFilter
	 * @property {string} [filter]          Predefined filters, one of `new_and_my_open`, `watching`, `spam`, `deleted`
	 * @property {string} [requester_id]    Requester
	 * @property {string} [email]           Requester
	 * @property {string} [company_id]      Company ID
	 * @property {string} [updated_since]   Updated since.
	 */

	/**
	 * listAllTickets API method.
	 *
	 * @see {@link http://developers.freshdesk.com/api/#list_all_tickets}
	 *
	 * @param  {Freshdesk.TicketsFilter}    params  Dictionary with request parameters for the API method, for example : `{"company_id": "YOUR_ID"}`
	 * @param  {Freshdesk.requestCallback<Array.<Freshdesk.Tickets>>}  cb
	 * Callback function {@link Freshdesk.requestCallback}
	 */
	listAllTickets(params, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/tickets`,
			params,
			null,
			cb
		);
	}

	/**
	 * Filter tickets
	 * @param {*} query Query tickets, refer https://developers.freshdesk.com/api/#filter_tickets
	 * @param {*} page Page number for pagination
	 * @param {*} cb
	 */
	filterTickets(query, page, cb) {
		// param shift
		if (utils.isNil(page) && utils.isFunction(page)) {
			cb = page;
			page = 1;
		}

		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/search/tickets?query="${encodeURI(
				query
			)}"&page=${page}`,
			null,
			null,
			cb
		);
	}

	listAllTicketFields(params, cb) {
		// param shift
		if (utils.isNil(cb) && utils.isFunction(params)) {
			cb = params;
			params = undefined;
		}

		const qs = {};
		if (params) {
			if (params.type) {
				qs["type"] = params.type;
			}
		}

		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/ticket_fields`,
			qs,
			null,
			cb
		);
	}

	createTicket(data, cb) {
		makeRequest(
			"POST",
			this._auth,
			`${this.baseUrl}/api/v2/tickets`,
			null,
			data,
			cb
		);
	}

	getTicket(id, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/tickets/${id}`,
			null,
			null,
			cb
		);
	}

	updateTicket(id, data, cb) {
		makeRequest(
			"PUT",
			this._auth,
			`${this.baseUrl}/api/v2/tickets/${id}`,
			null,
			data,
			cb
		);
	}

	deleteTicket(id, cb) {
		makeRequest(
			"DELETE",
			this._auth,
			`${this.baseUrl}/api/v2/tickets/${id}`,
			null,
			null,
			cb
		);
	}

	restoreTicket(id, cb) {
		makeRequest(
			"PUT",
			this._auth,
			`${this.baseUrl}/api/v2/tickets/${id}/restore`,
			null,
			null,
			cb
		);
	}

	listAllConversations(id, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/tickets/${id}/conversations`,
			null,
			null,
			cb
		);
	}

	listAllTicketTimeEntries(id, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/tickets/${id}/time_entries`,
			null,
			null,
			cb
		);
	}

	//Conversations

	createReply(id, data, cb) {
		makeRequest(
			"POST",
			this._auth,
			`${this.baseUrl}/api/v2/tickets/${id}/reply`,
			null,
			data,
			cb
		);
	}

	createNote(id, data, cb) {
		makeRequest(
			"POST",
			this._auth,
			`${this.baseUrl}/api/v2/tickets/${id}/notes`,
			null,
			data,
			cb
		);
	}

	updateConversation(id, data, cb) {
		makeRequest(
			"PUT",
			this._auth,
			`${this.baseUrl}/api/v2/conversations/${id}`,
			null,
			data,
			cb
		);
	}

	deleteConversation(id, cb) {
		makeRequest(
			"DELETE",
			this._auth,
			`${this.baseUrl}/api/v2/conversations/${id}`,
			null,
			null,
			cb
		);
	}

	//Contacts

	createContact(data, cb) {
		makeRequest(
			"POST",
			this._auth,
			`${this.baseUrl}/api/v2/contacts`,
			null,
			data,
			cb
		);
	}

	getContact(id, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/contacts/${id}`,
			null,
			null,
			cb
		);
	}

	listAllContacts(params, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/contacts`,
			params,
			null,
			cb
		);
	}

	updateContact(id, data, cb) {
		makeRequest(
			"PUT",
			this._auth,
			`${this.baseUrl}/api/v2/contacts/${id}`,
			null,
			data,
			cb
		);
	}

	deleteContact(id, cb) {
		makeRequest(
			"DELETE",
			this._auth,
			`${this.baseUrl}/api/v2/contacts/${id}`,
			null,
			null,
			cb
		);
	}

	makeAgent(id, cb) {
		makeRequest(
			"PUT",
			this._auth,
			`${this.baseUrl}/api/v2/contacts/${id}/make_agent`,
			null,
			null,
			cb
		);
	}

	listAllContactFields(cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/contact_fields`,
			null,
			null,
			cb
		);
	}

	/**
	 * Filter Contacts.
	 *
	 * Allows to get a list of contacts filtered with a query.
	 *
	 * **Query example:**: `"(contact_field:integer OR contact_field:'string') AND contact_field:boolean"`
	 *
	 * More documentation on the Freshdesk Developer Portal (link below).
	 *
	 * @see {@link https://developer.freshdesk.com/api/#filter_contacts}
	 *
	 * @category Contacts
	 *
	 * @param  {String}  query  The query, used to filter contacts
	 * @param  {Freshdesk.requestCallback<Array.<Freshdesk.ContactViewData>>}  cb
	 * Callback function {@link Freshdesk.requestCallback}
	 */
	filterContacts(query, cb) {
		const encodedQuery = encodeURI(query);
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/search/contacts?query="${encodedQuery}"`,
			null,
			null,
			cb
		);
	}

	// =========================================================================
	// Agents
	// =========================================================================

	/**
	 * Agent settings, for {@link updateAgent}.
	 *
	 * @category Agents
	 *
	 * @name Freshdesk.AgentData
	 * @typedef {Object}
	 * @property  {Boolean}        [occasional]     Set to true if this is an occasional agent (true => occasional, false => full-time)
	 * @property  {String}         [signature]      Signature of the agent in HTML format
	 * @property  {Number}         [ticket_scope]   Ticket permission of the agent (1 -> Global Access, 2 -> Group Access, 3 -> Restricted Access). Current logged in agent can't update his/her ticket_scope
	 * @property  {Array.<Number>} [group_ids]      Group IDs associated with the agent
	 * @property  {Array.<Number>} [role_ids]       Role IDs associated with the agent. At least one role should be associated with the agent. Current logged in agent can't update his/her role_ids
	 * @property  {String}         [name]           Name of the Agent
	 * @property  {String}         [email]          Email address of the Agent.
	 * @property  {String}         [phone]          Telephone number of the Agent.
	 * @property  {Number}         [mobile]         Mobile number of the Agent
	 * @property  {String}         [job_title]      Job title of the Agent
	 * @property  {String}         [language]       Language of the Agent. Default language is "en"
	 * @property  {String}         [time_zone]      Time zone of the Agent. Default value is time zone of the domain
	 */

	/**
	 * Agent settings, returned by view-methods.
	 *
	 * @category Companies
	 *
	 * @name Freshdesk.AgentResponse
	 * @typedef {Object}
	 * @property {Boolean}         [available]               If the agent is in a group that has enabled "Automatic Ticket Assignment", this attribute will be set to true if the agent is accepting new tickets
	 * @property {Date}            [available_since]         Timestamp that denotes when the agent became available/unavailable (depending on the value of the 'available' attribute)
	 * @property {Number}          [id]                      User ID of the agent
	 * @property {Boolean}         [occasional]              Set to true if this is an occasional agent (true => occasional, false => full-time)
	 * @property {String}          [signature]               Signature of the agent in HTML format
	 * @property {Number}          [ticket_scope]            Ticket permission of the agent (1 -> Global Access, 2 -> Group Access, 3 -> Restricted Access)
	 * @property {Array.<Number>}  [group_ids]               Group IDs associated with the agent
	 * @property {Array.<Number>}  [role_ids]                Role IDs associated with the agent
	 * @property {Date}            [created_at]              Agent creation timestamp
	 * @property {Date}            [updated_at]              Agent updated timestamp
	 * @property {Object}          [contact]
	 * @property {String}          [contact.active]          Set to true if the agent is verified
	 * @property {String}          [contact.email]           Email address of the agent
	 * @property {String}          [contact.job_title]       Job title of the agent
	 * @property {String}          [contact.language]        Language of the agent. Default language is "en"
	 * @property {Date}            [contact.last_login_at]   Timestamp of the agent's last successful login
	 * @property {Number}          [contact.mobile]          Mobile number of the agent
	 * @property {String}          [contact.name]            Name of the agent
	 * @property {Number}          [contact.phone]           Telephone number of the agent
	 * @property {String}          [contact.time_zone]       Time zone of the agent
	 * @property {Date}            [contact.created_at]      Creation timestamp
	 * @property {Date}            [contact.updated_at]      Timestamp of the last update
	 */

	/**
	 * Filter-settings for {@link listAllAgents}.
	 *
	 * @name  Freshdesk.AgentFilter
	 * @typedef  {Object} Freshdesk.AgentFilter
	 * @property {String}          [email]   Email
	 * @property {String | Number} [mobile]  Mobile number
	 * @property {String | Number} [phone]   Phone number
	 * @property {string}          [state]   Agent state, **one of `fulltime`/`occasional`**
	 */

	/**
	 * View an Agent.
	 *
	 * @see {@link https://developers.freshdesk.com/api/#view_agent}
	 *
	 * @category Agents
	 *
	 * @param {Number}  id  Agent ID
	 * @param {Freshdesk.requestCallback<Freshdesk.AgentResponse>} cb
	 * Callback function {@link Freshdesk.requestCallback}
	 */
	getAgent(id, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/agents/${id}`,
			null,
			null,
			cb
		);
	}

	/**
	 * List All Agents.
	 *
	 * @see {@link https://developers.freshdesk.com/api/#list_all_agents}
	 *
	 * @category Agents
	 *
	 * @param {Freshdesk.AgentFilter}  params  Agent filter
	 * @param {Freshdesk.requestCallback<Array.<Freshdesk.AgentResponse>>}  cb
	 * Callback function {@link Freshdesk.requestCallback}
	 */
	listAllAgents(params, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/agents`,
			params,
			null,
			cb
		);
	}

	/**
	 * Update an Agent.
	 *
	 * @see {@link https://developers.freshdesk.com/api/#update_agent}
	 *
	 * @category Agents
	 *
	 * @param {Number}               id         Agent ID
	 * @param {Freshdesk.AgentData}  data       New values for Agent's fields
	 * @param {Freshdesk.requestCallback<Freshdesk.AgentResponse>} cb
	 * Callback function {@link Freshdesk.requestCallback}
	 */
	updateAgent(id, data, cb) {
		makeRequest(
			"PUT",
			this._auth,
			`${this.baseUrl}/api/v2/agents/${id}`,
			null,
			data,
			cb
		);
	}

	/**
	 * Delete an Agent.
	 *
	 * @see {@link https://developers.freshdesk.com/api/#delete_agent}
	 *
	 * @category Agents
	 *
	 * @param {Number}                     id  Agent ID
	 * @param {Freshdesk.requestCallback}  cb  Callback function {@link Freshdesk.requestCallback}
	 *
	 */
	deleteAgent(id, cb) {
		makeRequest(
			"DELETE",
			this._auth,
			`${this.baseUrl}/api/v2/agents/${id}`,
			null,
			null,
			cb
		);
	}

	/**
	 * Currently Authenticated Agent.
	 *
	 * @see {@link https://developers.freshdesk.com/api/#me}
	 *
	 * @category Agents
	 *
	 * @param {Freshdesk.requestCallback<Freshdesk.AgentResponse>} cb
	 * Callback function {@link Freshdesk.requestCallback}
	 */
	currentAgent(cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/agents/me`,
			null,
			null,
			cb
		);
	}

	// Roles

	/**
	 * View a Role.
	 *
	 * @see {@link https://developers.freshdesk.com/api/#view_role}
	 *
	 * @category Roles
	 *
	 * @param  {Number}                             id      Unique ID of the Role
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 */
	getRole(id, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/roles/${id}`,
			null,
			null,
			cb
		);
	}

	/**
	 * List All Roles.
	 *
	 * @see {@link https://developers.freshdesk.com/api/#list_all_roles}
	 *
	 * @category Roles
	 *
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 * @return {void}          `void`
	 */
	listAllRoles(cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/roles`,
			null,
			null,
			cb
		);
	}

	// Companies

	/**
	 * Company settings, for {@link updateCompany} and {@link createCompany}.
	 *
	 * @category Companies
	 *
	 * @name Freshdesk.CompanyData
	 * @typedef  {Object}
	 * @property {Object.<string, Object>}   [custom_fields]   Key value pairs containing the names and values of custom fields. Only dates in the format YYYY-MM-DD are accepted as input for custom date fields. Read more here
	 * @property {string}                    [description]     Description of the company
	 * @property {Array.<string>}            [domains]         Domains of the company. Email addresses of contacts that contain this domain will be associated with that company automatically.
	 * @property {string}                    [name]            **UNIQUE** Name of the company
	 * @property {string}                    [note]            Any specific note about the company
	 */

	/**
	 * Company settings, returned by view-methods.
	 *
	 * @category Companies
	 *
	 * @name Freshdesk.CompanyViewData
	 * @typedef  {Object}
	 * @property {string}                    name              **UNIQUE** Name of the company
	 * @property {string}                    description       Description of the company
	 * @property {Array.<string>}            domains           Domains of the company. Email addresses of contacts that contain this domain will be associated with that company automatically.
	 * @property {string}                    note              Any specific note about the company
	 * @property {Date}                      created_at        Creation date
	 * @property {Date}                      updated_at        Last update date
	 * @property {Object.<string, Object>}   custom_fields     Key value pairs containing the names and values of custom fields. Only dates in the format YYYY-MM-DD are accepted as input for custom date fields. Read more here
	 */

	/**
	 * Creates company.
	 *
	 * @see {@link http://developer.freshdesk.com/api/#create_company}
	 *
	 * @category Companies
	 *
	 * @param  {Object}                             data    [description]
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 * @return {void}          `void`
	 */
	createCompany(data, cb) {
		makeRequest(
			"POST",
			this._auth,
			`${this.baseUrl}/api/v2/companies`,
			null,
			data,
			cb
		);
	}

	/**
	 * View a Company.
	 *
	 * @see {@link http://developer.freshdesk.com/api/#view_company}
	 *
	 * @category Companies
	 *
	 * @param  {Number}  id  Company ID
	 * @param  {Freshdesk.requestCallback<Freshdesk.CompanyViewData>}  cb
	 * Callback function
	 */
	getCompany(id, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/companies/${id}`,
			null,
			null,
			cb
		);
	}

	/**
	 * Search Companies.
	 *
	 * @see {@link https://developers.freshdesk.com/api/#search_companies}
	 *
	 * @category Companies
	 *
	 * @param  {*}  params Object containing parameter keys (name)
	 * @param  {Freshdesk.requestCallback<Freshdesk.CompanyViewData>}  cb
	 * Callback function
	 */
	searchCompany(params, cb) {
		// param shift
		if (utils.isNil(cb) && utils.isFunction(params)) {
			cb = params;
			params = undefined;
		}

		const qs = {};
		if (params) {
			if (params.name) {
				qs["name"] = params.name;
			}
		}

		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/companies/autocomplete`,
			qs,
			null,
			cb
		);
	}

	/**
	 * List All Companies.
	 *
	 * @see {@link http://developer.freshdesk.com/api/#list_all_companies}
	 *
	 * @category Companies
	 *
	 * @param  {*}  params Object containing parameter keys
	 * @param  {Freshdesk.requestCallback<Array.<Freshdesk.CompanyViewData>>}  cb
	 * Callback function {@link Freshdesk.requestCallback}
	 */
	listAllCompanies(params, cb) {
		// param shift
		if (utils.isNil(cb) && utils.isFunction(params)) {
			cb = params;
			params = undefined;
		}

		const qs = {};
		if (params) {
			if (params.page) {
				qs["page"] = params.page;
			}
		}

		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/companies`,
			qs,
			null,
			cb
		);
	}

	/**
	 * Filter Companies.
	 *
	 * Allows to get a list of companies filtered with a query.
	 *
	 * **Query example:**: `"(company_field:integer OR company_field:'string') AND company_field:boolean"`
	 *
	 * More documentation on the Freshdesk Developer Portal (link below).
	 *
	 * @see {@link https://developer.freshdesk.com/api/#filter_companies}
	 *
	 * @category Companies
	 *
	 * @param  {String}  query  The query, used to filter companies
	 * @param  {Freshdesk.requestCallback<Array.<Freshdesk.CompanyViewData>>}  cb
	 * Callback function {@link Freshdesk.requestCallback}
	 */
	filterCompanies(query, cb) {
		const encodedQuery = encodeURI(query);
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/search/companies?query="${encodedQuery}"`,
			null,
			null,
			cb
		);
	}

	listAllCompanyFields(cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/company_fields`,
			null,
			null,
			cb
		);
	}

	/**
	 * Updates company.
	 *
	 * @see {@link http://developer.freshdesk.com/api/#update_company}
	 *
	 * @category Companies
	 *
	 * @param  {Number}                             id      Company ID
	 * @param  {Freshdesk.UpdateCompanyData}        data    New settings for company
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 * @return {void}          `void`
	 */
	updateCompany(id, data, cb) {
		makeRequest(
			"PUT",
			this._auth,
			`${this.baseUrl}/api/v2/companies/${id}`,
			null,
			data,
			cb
		);
	}

	/**
	 * Delete a Company.
	 *
	 * Note:
	 *   1. Deleting a company does not delete the contacts that are associated with it. However the association will be removed.
	 *   2. Once deleted, a company cannot be restored.
	 *
	 * @see {@link http://developer.freshdesk.com/api/#delete_company}
	 *
	 * @category Companies
	 *
	 * @param  {Number}                             id      Company ID
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 */
	deleteCompany(id, cb) {
		makeRequest(
			"DELETE",
			this._auth,
			`${this.baseUrl}/api/v2/companies/${id}`,
			null,
			null,
			cb
		);
	}

	// =========================================================================
	// Time Entries
	// =========================================================================

	/**
	 * Time Entry data, returned by view-alike methods.
	 *
	 * @category TimeEntries
	 *
	 * @name Freshdesk.TimeEntryResponse
	 * @typedef  {Object}
	 * @property {Number}        agent_id             The ID of the agent to whom this time-entry is associated
	 * @property {Boolean}       billable             Set to true if the time entry is billable
	 * @property {Number}        id                   Unique ID of the time entry
	 * @property {Date}          executed_at          Time at which this time-entry was added/created
	 * @property {String}        note                 Description of the time entry
	 * @property {Date}          start_time           The time at which the time-entry is added or the time of the last invoked "start-timer" action using a toggle
	 * @property {Number}        ticket_id            The ID of the ticket to which this time entry is associated
	 * @property {String}        time_spent           The duration in hh:mm format
	 * @property {Boolean}       timer_running        Set to 'true' if the timer is currently running
	 * @property {Date}          created_at           Time Entry creation timestamp
	 * @property {Date}          updated_at           Time Entry updated timestamp
	 */

	/**
	 * Time Entry data, for {@link createTimeEntry} and {@link updateTimeEntry}.
	 *
	 * @category TimeEntries
	 *
	 * @name Freshdesk.TimeEntryData
	 * @typedef  {Object}
	 * @property {Number}        agent_id              The agent to whom this time-entry is associated. One agent can have only one timer running. Everything else will be stopped if new timer is on for an agent
	 * @property {Boolean}       billable              Set as true if the entry is billable. Default value is true
	 * @property {Date}          executed_at           Time at which this time-entry id added/created
	 * @property {String}        note                  Description on this time-entry
	 * @property {Date}          start_time            The time at which the time-entry is added or the time of the last invoked "start-timer" action using a toggle
	 * @property {String}        time_spent            The number of hours (in hh:mm format). Used to set the total time_spent
	 * @property {Boolean}       timer_running         Indicates if the timer is running
	 */

	/**
	 * Create a Time Entry
	 *
	 * Note:
	 * 1. If the `time_spent` is not specified and the `timer_running` attribute is not specified, then the `timer_running` attribute will automatically be set to `true`
	 * 2. If the `start_time` is specified and the `timer_running` attribute is not specified, then the `timer_running` attribute will automatically be set to `true`
	 * 3. The `start_time` cannot be greater than the current time
	 * 4. The `start_time` cannot be given in the API request if the `timer_running` attribute is set to `false`
	 *
	 * @category TimeEntries
	 *
	 * @see {@link https://developer.freshdesk.com/api/#create_time_entry}
	 *
	 * @param  {Number}                             ticket_id  Ticket Number ID
	 * @param  {Freshdesk.TimeEntryData}            data       New time entry data
	 * @param  {Freshdesk.requestCallback}          cb         Callback function {@link Freshdesk.requestCallback}
	 */
	createTimeEntry(ticket_id, data, cb) {
		makeRequest(
			"POST",
			this._auth,
			`${this.baseUrl}/api/v2/tickets/${ticket_id}/time_entries`,
			null,
			data,
			cb
		);
	}

	/**
	 * List All Time Entries
	 *
	 * @category TimeEntries
	 *
	 * @see {@link https://developer.freshdesk.com/api/#list_all_time_entries}
	 *
	 * @param  {Object}       params                    Filters to view only specific time entries
	 * @param  {Object}       [params.company_id]       Filter by _Company ID_
	 * @param  {Object}       [params.agent_id]         Filter by _Agent ID_
	 * @param  {Date}         [params.executed_before]  Filter by executed date
	 * @param  {Date}         [params.executed_after]   Filter by executed date
	 * @param  {Boolean}      [params.billable]         View only billable/not billable items. **Not a `String`, it is a `Boolean`**
	 * @param  {Freshdesk.requestCallback<Array.<Freshdesk.TimeEntryResponse>>}  cb
	 * Callback function {@link Freshdesk.requestCallback}
	 */
	listAllTimeEntries(params, cb) {
		const qs = {};

		if (params) {
			if ("billable" in params) {
				qs.billable = Boolean(params.billable).toString();
			}

			if ("executed_before" in params) {
				qs.executed_before = params.executed_before.toISOString();
			}
			if ("executed_after" in params) {
				qs.executed_after = params.executed_after.toISOString();
			}

			if ("page" in params) {
				qs.page = params.page;
			}

			qs.company_id = params.company_id;
			qs.agent_id = params.agent_id;
		}
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/time_entries`,
			qs,
			null,
			cb
		);
	}

	/**
	 * Update a Time Entry
	 *
	 * Note:
	 * 1. The `start_time` cannot be updated if the timer is already running
	 * 2. The `start_time` cannot be be updated unless the `timer_running` attribute is updated from `true` to `false`
	 * 3. The `start_time` cannot be greater than the current time
	 * 4. The `timer_running` attribute cannot be set to the same value as before
	 * 5. The `agent_id` cannot be updated if the timer is already running
	 *
	 * @category TimeEntries
	 *
	 * @see {@link https://developer.freshdesk.com/api/#update_time_entry}
	 *
	 * @param  {Number}                             id      Time Entry ID
	 * @param  {Freshdesk.TimeEntryData}            data    New time entry data
	 * @param  {Freshdesk.requestCallback<Freshdesk.TimeEntryResponse>}  cb
	 * Callback function {@link Freshdesk.requestCallback}
	 */
	updateTimeEntry(id, data, cb) {
		makeRequest(
			"PUT",
			this._auth,
			`${this.baseUrl}/api/v2/time_entries/${id}`,
			null,
			data,
			cb
		);
	}

	/**
	 * Start/Stop Timer
	 *
	 * @category TimeEntries
	 *
	 * @see {@link https://developer.freshdesk.com/api/#toggle_time_entry}
	 *
	 * @param  {Number}   id      Time Entry ID
	 * @param  {Freshdesk.requestCallback<Freshdesk.TimeEntryResponse>} cb
	 * Callback function {@link Freshdesk.requestCallback}
	 */
	toggleTimer(id, cb) {
		makeRequest(
			"PUT",
			this._auth,
			`${this.baseUrl}/api/v2/time_entries/${id}/toggle_timer`,
			null,
			null,
			cb
		);
	}

	/**
	 * Delete a Time Entry
	 *
	 * Note:
	 * Deleted time entries cannot be restored.
	 *
	 * @category TimeEntries
	 *
	 * @see {@link https://developer.freshdesk.com/api/#delete_time_entry}
	 *
	 * @param  {Number}                             id      Time entry ID
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 */
	deleteTimeEntry(id, cb) {
		makeRequest(
			"DELETE",
			this._auth,
			`${this.baseUrl}/api/v2/time_entries/${id}`,
			null,
			null,
			cb
		);
	}

	// =========================================================================
	// Solutions
	// =========================================================================

	/**
	 * Solution Category data, returned by view-alike methods.
	 *
	 * @category Solutions
	 *
	 * @name Freshdesk.SolutionCategoryResponse
	 * @typedef  {Object}
	 * @property {Number}          id                   Unique ID of the solution category
	 * @property {String}          name                 Name of the solution category
	 * @property {String}          description          Description of the solution category
	 * @property {Array.<Number>}  visible_in_portals   List of portal IDs where this category is visible
	 * @property {Date}            created_at           Solution Category creation timestamp
	 * @property {Date}            updated_at           Solution Category updated timestamp
	 */

	/**
	 * Solution Category data, for {@link createSolutionCategory}, {@link updateSolutionCategory}, {@link createTranslatedSolutionCategory} and {@link updateTranslatedSolutionCategory}.
	 *
	 * @category Solutions
	 *
	 * @name Freshdesk.SolutionCategoryData
	 * @typedef  {Object}
	 * @property {String}          description           Description of the solution category
	 * @property {String}          name                  Name of the solution category
	 * @property {Array.<Number>}  visible_in_portals    List of portal IDs where this category is visible. Allowed only if the account is configured with multiple portals.
	 */

	/**
	 * Create a Solution Category
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#create_solution_category}
	 *
	 * @param  {Freshdesk.SolutionCategoryData}     data       New solution category data
	 * @param  {Freshdesk.requestCallback}          cb         Callback function {@link Freshdesk.requestCallback}
	 */
	createSolutionCategory(data, cb) {
		makeRequest(
			"POST",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/categories`,
			null,
			data,
			cb
		);
	}

	/**
	 * Create a translated solution category
	 *
	 * Note:
	 * 1. Multilingual Feature must be enabled for the account
	 * 2. Supported languages have to be configured from *Admin > General Settings > Helpdesk*
	 * 3. Configured languages can be retrieved from *Helpdesk Settings*
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#create_solution_category}
	 *
	 * @param  {Number}                             id             Solution category ID
	 * @param  {String}                             language_code  Language code for the translated solution category
	 * @param  {Freshdesk.SolutionCategoryData}     data           Translated solution category data
	 * @param  {Freshdesk.requestCallback}          cb             Callback function {@link Freshdesk.requestCallback}
	 */
	createTranslatedSolutionCategory(id, language_code, data, cb) {
		makeRequest(
			"POST",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/categories/${id}/${language_code}`,
			null,
			data,
			cb
		);
	}

	/**
	 * Update a Solution Category
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#update_solution_category}
	 *
	 * @param  {Number}                             id         Solution category ID
	 * @param  {Freshdesk.SolutionCategoryData}     data       Updated solution category data
	 * @param  {Freshdesk.requestCallback}          cb         Callback function {@link Freshdesk.requestCallback}
	 */
	updateSolutionCategory(id, data, cb) {
		makeRequest(
			"PUT",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/categories/${id}`,
			null,
			data,
			cb
		);
	}

	/**
	 * Update a translated solution category
	 *
	 * Note:
	 * 1. Multilingual Feature must be enabled for the account
	 * 2. Supported languages have to be configured from *Admin > General Settings > Helpdesk*
	 * 3. Configured languages can be retrieved from *Helpdesk Settings*
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#update_solution_category}
	 *
	 * @param  {Number}                             id             Solution category ID
	 * @param  {String}                             language_code  Language code for the translated solution category
	 * @param  {Freshdesk.SolutionCategoryData}     data           Updated translated solution category data
	 * @param  {Freshdesk.requestCallback}          cb             Callback function {@link Freshdesk.requestCallback}
	 */
	updateTranslatedSolutionCategory(id, language_code, data, cb) {
		makeRequest(
			"PUT",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/categories/${id}/${language_code}`,
			null,
			data,
			cb
		);
	}

	/**
	 * View a Solution Category
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#view_solution_category}
	 *
	 * @param  {Number}                             id      Solution category ID
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 */
	getSolutionCategory(id, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/categories/${id}`,
			null,
			null,
			cb
		);
	}

	/**
	 * List all Solution Categories
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#list_all_solution_categories}
	 *
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 */
	listAllSolutionCategories(cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/categories`,
			null,
			null,
			cb
		);
	}

	/**
	 * Delete a Solution Category
	 *
	 * Note:
	 * When deleted, all translated versions will be deleted too.
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#delete_solution_category}
	 *
	 * @param  {Number}                             id      Solution category ID
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 */
	deleteSolutionCategory(id, cb) {
		makeRequest(
			"DELETE",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/categories/${id}`,
			null,
			null,
			cb
		);
	}

	/**
	 * Solution Folder data, returned by view-alike methods.
	 *
	 * @category Solutions
	 *
	 * @name Freshdesk.SolutionFolderResponse
	 * @typedef  {Object}
	 * @property {Number}          id                   Unique ID of the solution folder
	 * @property {String}          name                 Name of the solution folder
	 * @property {String}          description          Description of the solution folder
	 * @property {Number}          visibility           Accessibility of this folder. Please refer to Folder Properties table.
	 * @property {Array.<Number>}  company_ids          IDs of the companies to whom this solution folder is visible
	 * @property {Array.<Number>}  contact_segment_ids  IDs of the contact segments to whom this solution folder is visible
	 * @property {Array.<Number>}  company_segment_ids  IDs of the company segments to whom this solution folder is visible
	 * @property {Date}            created_at           Solution Folder creation timestamp
	 * @property {Date}            updated_at           Solution Folder updated timestamp
	 */

	/**
	 * Solution Folder data, for {@link createSolutionFolder}, {@link updateSolutionFolder}, {@link createTranslatedSolutionFolder} and {@link updateTranslatedSolutionFolder}.
	 *
	 * @category Solutions
	 *
	 * @name Freshdesk.SolutionFolderData
	 * @typedef  {Object}
	 * @property {String}          description           Description of the solution folder
	 * @property {String}          name                  Name of the solution folder
	 * @property {Number}          visibility            Accessibility of this folder. *The default value is 1*
	 * @property {Array.<Number>}  company_ids           IDs of the companies to whom this solution folder is visible
	 * @property {Array.<Number>}  contact_segment_ids   IDs of the contact segments to whom this solution folder is visible
	 * @property {Array.<Number>}  company_segment_ids   IDs of the company segments to whom this solution folder is visible
	 */

	/**
	 * Create a Solution Folder
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#create_solution_folder}
	 *
	 * @param  {Number}                             id         Solution category ID
	 * @param  {Freshdesk.SolutionFolderData}     data         New solution folder data
	 * @param  {Freshdesk.requestCallback}          cb         Callback function {@link Freshdesk.requestCallback}
	 */
	createSolutionFolder(id, data, cb) {
		makeRequest(
			"POST",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/categories/${id}/folders`,
			null,
			data,
			cb
		);
	}

	/**
	 * Create a translated solution folder
	 *
	 * Note:
	 * 1. Multilingual Feature must be enabled for the account
	 * 2. Supported languages have to be configured from *Admin > General Settings > Helpdesk*
	 * 3. Configured languages can be retrieved from *Helpdesk Settings*
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#create_solution_folder}
	 *
	 * @param  {Number}                             id             Solution folder ID
	 * @param  {String}                             language_code  Language code for the translated solution folder
	 * @param  {Freshdesk.SolutionFolderData}       data           Translated solution folder data
	 * @param  {Freshdesk.requestCallback}          cb             Callback function {@link Freshdesk.requestCallback}
	 */
	createTranslatedSolutionFolder(id, language_code, data, cb) {
		makeRequest(
			"POST",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/folders/${id}/${language_code}`,
			null,
			data,
			cb
		);
	}

	/**
	 * Update a Solution Folder
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#update_solution_folder}
	 *
	 * @param  {Number}                             id         Solution folder ID
	 * @param  {Freshdesk.SolutionFolderData}       data       Updated solution folder data
	 * @param  {Freshdesk.requestCallback}          cb         Callback function {@link Freshdesk.requestCallback}
	 */
	updateSolutionFolder(id, data, cb) {
		makeRequest(
			"PUT",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/folders/${id}`,
			null,
			data,
			cb
		);
	}

	/**
	 * Update a translated solution folder
	 *
	 * Note:
	 * 1. Multilingual Feature must be enabled for the account
	 * 2. Supported languages have to be configured from *Admin > General Settings > Helpdesk*
	 * 3. Configured languages can be retrieved from *Helpdesk Settings*
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#update_solution_folder}
	 *
	 * @param  {Number}                             id             Solution folder ID
	 * @param  {String}                             language_code  Language code for the translated solution folder
	 * @param  {Freshdesk.SolutionFolderData}       data           Updated translated solution folder data
	 * @param  {Freshdesk.requestCallback}          cb             Callback function {@link Freshdesk.requestCallback}
	 */
	updateTranslatedSolutionFolder(id, language_code, data, cb) {
		makeRequest(
			"PUT",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/folders/${id}/${language_code}`,
			null,
			data,
			cb
		);
	}

	/**
	 * View a Solution Folder
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#view_solution_folder}
	 *
	 * @param  {Number}                             id      Solution folder ID
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 */
	getSolutionFolder(id, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/folders/${id}`,
			null,
			null,
			cb
		);
	}

	/**
	 * List all Solution Folders in a Category
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#list_all_solution_folders}
	 *
	 * @param  {Number}                             id      Solution category ID
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 */
	listAllSolutionCategoryFolders(id, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/categories/${id}/folders`,
			null,
			null,
			cb
		);
	}

	/**
	 * Delete a Solution Folder
	 *
	 * Note:
	 * When deleted, all translated versions will be deleted too.
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#delete_solution_folder}
	 *
	 * @param  {Number}                             id      Solution folder ID
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 */
	deleteSolutionFolder(id, cb) {
		makeRequest(
			"DELETE",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/folders/${id}`,
			null,
			null,
			cb
		);
	}

	/**
	 * Solution Article data, returned by view-alike methods.
	 *
	 * @category Solutions
	 *
	 * @name Freshdesk.SolutionArticleResponse
	 * @typedef  {Object}
	 * @property {Number}                   id                   Unique ID of the solution article
	 * @property {Number}                   agent_id             ID of the agent who created the solution article
	 * @property {Number}                   category_id          ID of the category to which the solution article belongs
	 * @property {String}                   description          Description of the solution article
	 * @property {String}                   description_text     Description of the solution article in plain text
	 * @property {Number}                   folder_id            ID of the folder to which the solution article belongs
	 * @property {Number}                   hits                 Number of views for the solution article
	 * @property {Number}                   status               Status of the solution article
	 * @property {Object.<string, Object>}  seo_data             Meta data for search engine optimization. Allows meta_title, meta_description and meta_keywords
	 * @property {Array.<String>}           tags                 Tags that have been associated with the solution article
	 * @property {Number}                   thumbs_down          Number of down votes for the solution article
	 * @property {Number}                   thumbs_up            Number of upvotes for the solution article
	 * @property {String}                   title                Title of the solution article
	 * @property {Date}                     created_at           Solution Article creation timestamp
	 * @property {Date}                     updated_at           Solution Article updated timestamp
	 */

	/**
	 * Solution Article data, for {@link createSolutionArticle}, {@link updateSolutionArticle}, {@link createTranslatedSolutionArticle} and {@link updateTranslatedSolutionArticle}.
	 *
	 * @category Solutions
	 *
	 * @name Freshdesk.SolutionArticleData
	 * @typedef  {Object}
	 * @property {String}                   description           Description of the solution article
	 * @property {Number}                   status                Status of the solution article. *(1 - draft, 2 - published)*
	 * @property {Object.<string, Object>}  seo_data              Meta data for search engine optimization. Allows meta_title, meta_description and meta_keywords
	 * @property {Array.<String>}           tags                  Tags that have been associated with the solution article
	 * @property {String}                   title                 Title of the solution article
	 */

	/**
	 * Create a Solution Article
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#create_solution_article}
	 *
	 * @param  {Number}                             id         Solution folder ID
	 * @param  {Freshdesk.SolutionFolderData}       data       New solution article data
	 * @param  {Freshdesk.requestCallback}          cb         Callback function {@link Freshdesk.requestCallback}
	 */
	createSolutionArticle(id, data, cb) {
		makeRequest(
			"POST",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/folders/${id}/articles`,
			null,
			data,
			cb
		);
	}

	/**
	 * Create a translated solution article
	 *
	 * Note:
	 * 1. Multilingual Feature must be enabled for the account
	 * 2. Supported languages have to be configured from *Admin > General Settings > Helpdesk*
	 * 3. Configured languages can be retrieved from *Helpdesk Settings*
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#create_solution_article}
	 *
	 * @param  {Number}                             id             Solution article ID
	 * @param  {String}                             language_code  Language code for the translated solution article
	 * @param  {Freshdesk.SolutionArticleData}      data           Translated solution article data
	 * @param  {Freshdesk.requestCallback}          cb             Callback function {@link Freshdesk.requestCallback}
	 */
	createTranslatedSolutionArticle(id, language_code, data, cb) {
		makeRequest(
			"POST",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/articles/${id}/${language_code}`,
			null,
			data,
			cb
		);
	}

	/**
	 * Update a Solution Article
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#update_solution_article}
	 *
	 * @param  {Number}                             id         Solution article ID
	 * @param  {Freshdesk.SolutionArticleData}      data       Updated solution article data
	 * @param  {Freshdesk.requestCallback}          cb         Callback function {@link Freshdesk.requestCallback}
	 */
	updateSolutionArticle(id, data, cb) {
		makeRequest(
			"PUT",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/articles/${id}`,
			null,
			data,
			cb
		);
	}

	/**
	 * Update a translated solution article
	 *
	 * Note:
	 * 1. Multilingual Feature must be enabled for the account
	 * 2. Supported languages have to be configured from *Admin > General Settings > Helpdesk*
	 * 3. Configured languages can be retrieved from *Helpdesk Settings*
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#update_solution_article}
	 *
	 * @param  {Number}                             id             Solution article ID
	 * @param  {String}                             language_code  Language code for the translated solution article
	 * @param  {Freshdesk.SolutionArticleData}      data           Updated translated solution article data
	 * @param  {Freshdesk.requestCallback}          cb             Callback function {@link Freshdesk.requestCallback}
	 */
	updateTranslatedSolutionArticle(id, language_code, data, cb) {
		makeRequest(
			"PUT",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/articles/${id}/${language_code}`,
			null,
			data,
			cb
		);
	}

	/**
	 * View a Solution Article
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#view_solution_article}
	 *
	 * @param  {Number}                             id      Solution article ID
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 */
	getSolutionArticle(id, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/articles/${id}`,
			null,
			null,
			cb
		);
	}

	/**
	 * View a translated Solution Article
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#view_solution_article}
	 *
	 * @param  {Number}                             id      		Solution article ID
	 * @param  {String}                             language_code	Language code for the translated solution article
	 * @param  {Freshdesk.requestCallback}          cb             	Callback function {@link Freshdesk.requestCallback}
	 */
	getTranslatedSolutionArticle(id, language_code, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/articles/${id}/${language_code}`,
			null,
			null,
			cb
		);
	}

	/**
	 * List all Solution Articles in a Folder
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#list_all_solution_articles}
	 *
	 * @param  {Number}                             id      Solution folder ID
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 */
	listAllSolutionFolderArticles(id, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/folders/${id}/articles`,
			null,
			null,
			cb
		);
	}

	/**
	 * Delete a Solution Article
	 *
	 * Note:
	 * When deleted, all translated versions will be deleted too.
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#delete_solution_article}
	 *
	 * @param  {Number}                             id      Solution article ID
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 */
	deleteSolutionArticle(id, cb) {
		makeRequest(
			"DELETE",
			this._auth,
			`${this.baseUrl}/api/v2/solutions/articles/${id}`,
			null,
			null,
			cb
		);
	}

	/**
	 * Search solution articles
	 *
	 * @category Solutions
	 *
	 * @see {@link https://developer.freshdesk.com/api/#search_solution_article}
	 *
	 * @param  {String}                             term    Keyword to search for
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 */
	searchSolutionArticles(term, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/search/solutions?term=${encodeURI(term)}`,
			null,
			null,
			cb
		);
	}

	// =========================================================================
	// Settings
	// =========================================================================

	/**
	 * View Helpdesk Settings
	 *
	 * @category Settings
	 *
	 * @see {@link https://developer.freshdesk.com/api/#settings}
	 *
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 */
	getSettings(cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/settings/helpdesk`,
			null,
			null,
			cb
		);
	}
	// Added by us

	/**
	 * Creates outbound email
	 */
	createTicketEmail(data, cb) {
		makeRequest(
			"POST",
			this._auth,
			`${this.baseUrl}/api/v2/tickets/outbound_email`,
			null,
			data,
			cb
		);
	}

	/**
	 * Lists all agent's groups
	 */
	listAllGroups(id, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/groups`,
			null,
			null,
			cb
		);
	}

	/**
	 * Lists all support emails
	 */
	listAllEmails(id, cb) {
		makeRequest(
			"GET",
			this._auth,
			`${this.baseUrl}/api/v2/email_configs`,
			null,
			null,
			cb
		);
	}
}

module.exports = Freshdesk;

module.exports.FreshdeskError = FreshdeskError;
