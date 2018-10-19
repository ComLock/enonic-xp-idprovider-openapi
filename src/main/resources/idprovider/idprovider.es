import {toStr} from '/lib/enonic/util';
import {dlv} from '/lib/enonic/util/object';
import {
	getIdProviderConfig,
	login as authLogin
} from '/lib/xp/auth';


export function autologin(request) {
	log.info(`autologin(${toStr({request})})`);
	const idProviderConfig = getIdProviderConfig();
	log.info(toStr({idProviderConfig}));
}


export function get(request) {
	log.info(`get(${toStr({request})})`);
}


export function handle401(request) {
	log.info(`handle401(${toStr({request})})`);
	const idProviderConfig = getIdProviderConfig();
	log.info(toStr({idProviderConfig}));
	const headerName = dlv(idProviderConfig, 'securitySchemesOptionSet.apiKey.inOptionSet.header.name');
	if (headerName && request.headers[headerName]) {
		log.info(toStr({[`request.headers[${headerName}]`]: request.headers[headerName]}));
		const user = dlv(idProviderConfig, 'securitySchemesOptionSet.apiKey.users.name'); log.info(toStr({user}));
		const userStore = dlv(idProviderConfig, 'securitySchemesOptionSet.apiKey.users.userStore'); log.info(toStr({userStore}));
		const key = dlv(idProviderConfig, 'securitySchemesOptionSet.apiKey.users.keys.key'); log.info(toStr({key}));
		if (key === request.headers[headerName]) {
			authLogin({
				user,
				userStore,
				skipAuth: true
			});
		}
	}
}


export function handle403(request) {
	return handle401(request);
}


export function login(request) {
	log.info(`login(${toStr({request})})`);
}


export function logout(request) {
	log.info(`logout(${toStr({request})})`);
}


export function post(request) {
	log.info(`post(${toStr({request})})`);
}
