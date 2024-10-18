<template>
    <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <div class="d-flex justify-content-between">
                <h3 class="">Create Campaign</h3>
                <button @click="downloadCSV" class="btn btn-outline-dark">Sample File Download</button>
            </div>
            <form @submit.prevent="createCampaign">
                <div class="mb-3">
                    <label for="campaignName" class="form-label">Campaign Name</label>
                    <input type="text" class="form-control" id="campaignName" v-model="campaign_name" required />
                </div>
                <div class="mb-3">
                    <label for="csvUpload" class="form-label">CSV Upload</label>
                    <input type="file" class="form-control" @change="handleFileUpload" id="csvUpload" accept=".csv"
                        required />
                </div>
                <div class="text-end">
                    <button type="submit" class="btn btn-primary w-100 mt-4">Create</button>
                </div>
            </form>
        </div>
        <div class="col-md-2"></div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "CreateCampaign",
    data() {
        return {
            campaign_name: '',
            csv_file: null,
        };
    },
    methods: {
        handleFileUpload(event) {
            this.csv_file = event.target.files[0];
        },

        downloadCSV() {
            const link = document.createElement('a');
            link.href = this.$router.resolve({ path: '/assets/csvupload.csv' }).href;
            link.download = 'sample.csv';
            link.click();
        },

        async createCampaign() {
            if (!this.campaign_name || !this.csv_file) {
                alert('Please fill all fields.');
                return;
            }

            const formData = new FormData();
            formData.append('campaign_name', this.campaign_name);
            formData.append('csv_file', this.csv_file);

            try {
                const response = await axios.post('http://127.0.0.1:8000/api/campaign', formData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });

                if (response.data.success) {
                    this.campaign_name = '';
                    this.csv_file = null;
                    alert('Campaign created successfully');
                    this.$router.push({ name: 'Campaign Index' });
                } else {
                    alert('Failed to create campaign');
                }
            } catch (error) {
                console.error(error);
                alert('An error occurred while creating the campaign.');
            }
        }
    }
};
</script>
