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
                                <th>Total CSV</th>
                                <th>Failed to Save</th>
                                <th>Email Sent</th>
                                <th>Total Contents</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="campaign in campaigns" :key="campaign.id">
                                <td>{{ campaign.name }}</td>
                                <td>{{ campaignProgress[campaign.id]?.totalEmails }}</td>
                                <td>{{ campaignProgress[campaign.id]?.failedEmails }}</td>
                                <td>{{ campaignProgress[campaign.id]?.processedEmails }} </td>
                                <td>{{ campaignProgress[campaign.id]?.sendProcessedEmails }}</td>

                                <td :class="statusClass(campaign.status)">{{ statusText(campaign.status) }}</td>
                                <td class="text-center">
                                    <button class="btn btn-outline-primary me-2" @click="editCampaign(campaign.id)"
                                        v-if="campaign.status == '0'">
                                        <i class="fas fa-edit"></i> Add Content
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

export default {
    name: "CampaignList",
    data() {
        return {
            campaigns: [],
            campaignProgress: {},  // Holds process data for each campaign
            token: localStorage.getItem('authToken'),
            intervalId: null,  // To hold the interval ID for polling
        };
    },
    methods: {
        // Fetch campaigns on component mount
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
                    this.fetchCampaignProgress(campaign.id);
                });
                this.intervalId = setInterval(() => {
                    this.campaigns.forEach(campaign => {
                        this.fetchCampaignProgress(campaign.id);
                    });
                }, 45000);
            } catch (error) {
                console.error(error);
                alert('Failed to fetch campaigns.');
            }
        },

        // Fetch the process status for a campaign
        async fetchCampaignProgress(campaignId) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/status/${campaignId}`, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });
                const progressData = response.data.data;
                // Update the campaign progress
                this.campaignProgress[campaignId].processedEmails = progressData.save?.proccesd;
                this.campaignProgress[campaignId].failedEmails = progressData.save?.failed;
                this.campaignProgress[campaignId].sendProcessedEmails = progressData.email?.proccesd;
                this.campaignProgress[campaignId].totalEmails = progressData.email?.total;
            } catch (error) {
                console.error(`Failed to fetch progress for campaign ${campaignId}:`, error);
            }
        },

        // Status text
        statusText(status) {
            switch (status) {
                case '0': return "Pending";
                case '1': return "Processing";
                case '2': return "Completed";
                case '3': return "Rejected";
                default: return "Unknown";
            }
        },

        // Status class for styling
        statusClass(status) {
            switch (status) {
                case '0': return 'text-warning';
                case '1': return 'text-info';
                case '2': return 'text-success';
                case '3': return 'text-danger';
                default: return '';
            }
        },

        // Redirect to edit campaign page
        editCampaign(campaignId) {
            this.$router.push({ name: 'Campaign Update', params: { id: campaignId } });
        },

        // Delete a campaign
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
        },
    },
    mounted() {
        this.fetchCampaigns();
    },
    beforeUnmount() {
        // Clear the interval when the component is destroyed
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
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
