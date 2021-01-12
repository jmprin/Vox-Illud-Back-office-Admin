import http from './http-common';
class StatsService {
    
    async get(url){
        return http.get(url);
    }

    async getStats({start,end}) {
        return http.get(`/admin/stats?start_date=${start}&end_date=${end}`);
    }

    async getSessions({start,end}) {
        return http.get(`/admin/sessions?start_date=${start}&end_date=${end}`);
    }
}

export default new StatsService();
