<template>
    <div class="row row-centered">
        <div class="col-md-1"></div>
        <div class="col-md-10 text-center">
            <h3 class="text-center">Campaigns</h3>
            <div class="card">
                <div class="card-body">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Campaign Name</th>
                                <th>Total Send Emails</th>
                                <th>Total Contents</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="campaign in campaigns" :key="campaign.id">
                                <td>{{ campaign.name }}</td>
                                <td>{{ campaignProgress[campaign.id]?.processedEmails }} / {{
                                    campaignProgress[campaign.id]?.totalEmails }}</td>
                                <td>{{ campaignProgress[campaign.id]?.sendProcessedEmails }} / {{
                                    campaignProgress[campaign.id]?.failedEmails }}</td>

                                <td :class="statusClass(campaign.status)">{{ statusText(campaign.status) }}</td>
                                <td class="text-center">
                                    <button class="btn btn-outline-primary me-2" @click="editCampaign(campaign.id)">
                                        <i class="fas fa-edit"></i> Edit
                                    </button>
                                    <button class="btn btn-outline-danger" @click="deleteCampaign(campaign.id)">
                                        <i class="fas fa-trash-alt"></i> Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-md-1"></div>
    </div>
</template>

<script>
import axios from 'axios';
import createEchoInstance from '@/echo.js';

export default {
    name: "CampaignList",
    data() {
        return {
            campaigns: [],
            campaignProgress: {},
            token: localStorage.getItem('authToken')
        };
    },
    methods: {
        async fetchCampaigns() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/campaign', {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });
                this.campaigns = response.data.data;

                this.campaigns.forEach(campaign => {
                    this.campaignProgress[campaign.id] = {
                        processedEmails: 0,
                        totalEmails: 0,
                        sendProcessedEmails: 0,
                        failedEmails: 0
                    };
                    const echo = createEchoInstance(campaign.id);

                    echo.channel('campaign.' + campaign.id).listen('EmailProgressUpdated', (event) => {
                        this.campaignProgress[campaign.id].processedEmails = event.processedEmails;
                        this.campaignProgress[campaign.id].totalEmails = event.totalEmails;
                        console.log(event);
                    });

                    echo.channel('campaignSave.' + campaign.id).listen('EmailSaveUpdated', (event) => {
                        this.campaignProgress[campaign.id].sendProcessedEmails = event.processedEmails;
                        this.campaignProgress[campaign.id].failedEmails = event.failedEmails;
                    });
                });
            } catch (error) {
                console.error(error);
                alert('Failed to fetch campaigns.');
            }
        },

        statusText(status) {
            switch (status) {
                case '0': return "Pending";
                case '1': return "Processing";
                case '2': return "Completed";
                case '3': return "Rejected";
                default: return "Unknown";
            }
        },

        statusClass(status) {
            switch (status) {
                case '0': return 'text-warning';
                case '1': return 'text-info';
                case '2': return 'text-success';
                case '3': return 'text-danger';
                default: return '';
            }
        },

        editCampaign(campaignId) {
            this.$router.push({ name: 'Campaign Update', params: { id: campaignId } });
        },

        async deleteCampaign(campaignId) {
            if (!confirm('Are you sure you want to delete this campaign?')) {
                return;
            }

            try {
                await axios.delete(`http://127.0.0.1:8000/api/campaigns/${campaignId}`, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });
                this.campaigns = this.campaigns.filter(campaign => campaign.id !== campaignId);
                alert('Campaign deleted successfully.');
            } catch (error) {
                console.error(error);
                alert('Failed to delete campaign.');
            }
        }
    },
    mounted() {
        this.fetchCampaigns();
    }
};
</script>

<style scoped>
.table {
    margin-top: 20px;
}

.row {
    text-align: center;
}
</style>
