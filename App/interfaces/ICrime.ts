/*
"category": "anti-social-behaviour",
"persistent_id": "",
"location_subtype": "",
"id": 10467260,
"location": {
    "latitude": "52.629909",
    "street": {
    "id": 883345,
    "name": "On or near Marquis Street"
    },
    "longitude": "-1.132073"
},
"context": "",
"month": "2012-02",
"location_type": "Force",
"outcome_status": null
*/

interface ICrime {
    category: string;
    persistent_id: string;
    location_subtype: string;
    id: number;
    location: any;
    context: string;
    month: string;
    location_type: string;
    outcome_status: any;
}

export = ICrime;