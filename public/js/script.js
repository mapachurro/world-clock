const timezones = [
    { label: 'UTC', value: 'UTC', name: 'Coordinated Universal Time' },
    { label: 'Pacific/Honolulu', value: 'Pacific/Honolulu', name: 'Hawaii' },
    { label: 'America/Los_Angeles', value: 'America/Los_Angeles', name: 'US Pacific Time' },
    { label: 'America/Denver', value: 'America/Denver', name: 'US Mountain Time' },
    { label: 'America/Chicago', value: 'America/Chicago', name: 'US Central Time' },
    { label: 'America/New_York', value: 'America/New_York', name: 'US Eastern Time (New York)' },
    { label: 'America/St_Johns', value: 'America/St_Johns', name: 'Newfoundland, CA' },
    { label: 'America/Sao_Paulo', value: 'America/Sao_Paulo', name: 'São Paulo, Brazil' },
    { label: 'America/Rio_Branco', value: 'America/Rio_Branco', name: 'Rio Branco, Brazil' },
    { label: 'America/Fortaleza', value: 'America/Fortaleza', name: 'Fortaleza, Brazil' },
    { label: 'America/Mexico_City', value: 'America/Mexico_City', name: 'Mexico City, Mexico' },
    { label: 'America/Cancun', value: 'America/Cancun', name: 'Cancun, Mexico' },
    { label: 'America/Monterrey', value: 'America/Monterrey', name: 'Monterrey, Mexico' },
    { label: 'Europe/Dublin', value: 'Europe/Dublin', name: 'Ireland' },
    { label: 'Europe/London', value: 'Europe/London', name: 'London' },
    { label: 'Europe/Lisbon', value: 'Europe/Lisbon', name: 'Portugal' },
    { label: 'Europe/Madrid', value: 'Europe/Madrid', name: 'Madrid, Spain' },
    { label: 'CET', value: 'CET', name: 'Central European Time (CET)' },
    { label: 'EET', value: 'EET', name: 'Eastern European Time (EET)' },
    { label: 'Asia/Jerusalem', value: 'Asia/Jerusalem', name: 'Israel' },
    { label: 'Europe/Malta', value: 'Europe/Malta', name: 'Malta' },
    { label: 'Asia/Dubai', value: 'Asia/Dubai', name: 'Dubai' },
    { label: 'Asia/Kolkata', value: 'Asia/Kolkata', name: 'India (Kolkata)' },
    { label: 'Europe/Istanbul', value: 'Europe/Istanbul', name: 'Turkey (Istanbul)' },
    { label: 'Asia/Riyadh', value: 'Asia/Riyadh', name: 'Saudi Arabia (Riyadh)' },
    { label: 'Asia/Tehran', value: 'Asia/Tehran', name: 'Iran (Tehran, UTC+3:30)' },
    { label: 'Asia/Karachi', value: 'Asia/Karachi', name: 'Pakistan (Karachi)' },
    { label: 'Asia/Shanghai', value: 'Asia/Shanghai', name: 'China (Shanghai, Beijing)' },
    { label: 'Asia/Bangkok', value: 'Asia/Bangkok', name: 'Thailand (Bangkok)' },
    { label: 'Asia/Kuala_Lumpur', value: 'Asia/Kuala_Lumpur', name: 'Malaysia (Kuala Lumpur)' },
    { label: 'Asia/Jakarta', value: 'Asia/Jakarta', name: 'Indonesia (Jakarta)' },
    { label: 'Asia/Seoul', value: 'Asia/Seoul', name: 'South Korea (Seoul)' },
    { label: 'Asia/Tokyo', value: 'Asia/Tokyo', name: 'Japan (Tokyo)' },
    { label: 'Europe/Moscow', value: 'Europe/Moscow', name: 'Russia (Moscow, UTC+3)' },
    { label: 'Asia/Yekaterinburg', value: 'Asia/Yekaterinburg', name: 'Russia (Yekaterinburg, UTC+5)' },
    { label: 'Asia/Novosibirsk', value: 'Asia/Novosibirsk', name: 'Russia (Novosibirsk, UTC+7)' },
    { label: 'Asia/Vladivostok', value: 'Asia/Vladivostok', name: 'Russia (Vladivostok, UTC+10)' },
    { label: 'Australia/Sydney', value: 'Australia/Sydney', name: 'Sydney, Australia' },
    { label: 'Australia/Melbourne', value: 'Australia/Melbourne', name: 'Melbourne, Australia' },
    { label: 'Australia/Brisbane', value: 'Australia/Brisbane', name: 'Brisbane, Australia' },
    { label: 'Australia/Adelaide', value: 'Australia/Adelaide', name: 'Adelaide, Australia' },
    { label: 'Australia/Perth', value: 'Australia/Perth', name: 'Perth, Australia' },
    { label: 'Australia/Hobart', value: 'Australia/Hobart', name: 'Hobart, Australia' }
];
    function updateTime(clockElement, timezone) {
        const date = new Date();
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: timezone };
        const timeString = date.toLocaleTimeString([], options);
        clockElement.innerText = timeString;
    }

    function addClock(timezone = 'UTC') {
        const clockContainer = document.getElementById('clockContainer');

        if (!clockContainer) {
            console.error('Clock container not found!');
            return;
        }

        const clockCard = document.createElement('div');
        clockCard.className = 'card clock-card';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const timeDisplay = document.createElement('div');
        timeDisplay.className = 'time-display';
        timeDisplay.innerText = 'Loading...';
        cardBody.appendChild(timeDisplay);

        const timeZoneSelector = document.createElement('select');
        timeZoneSelector.className = 'form-select';
        timezones.forEach(tz => {
            const option = document.createElement('option');
            option.value = tz.value;
            option.innerText = `${tz.label} (${tz.name})`;
            timeZoneSelector.appendChild(option);
        });
        timeZoneSelector.value = timezone;
        cardBody.appendChild(timeZoneSelector);

        const timezoneName = document.createElement('div');
        timezoneName.className = 'timezone-name';
        timezoneName.innerText = timezones.find(tz => tz.value === timezone).name;
        cardBody.appendChild(timezoneName);

        timeZoneSelector.addEventListener('change', () => {
            updateTime(timeDisplay, timeZoneSelector.value);
            timezoneName.innerText = timezones.find(tz => tz.value === timeZoneSelector.value).name;
        });

        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-remove';
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', () => {
            clockContainer.removeChild(clockCard);
        });
        cardBody.appendChild(removeButton);

        clockCard.appendChild(cardBody);

        const addClockElement = document.querySelector('.add-clock');

        if (addClockElement && addClockElement.parentNode) {
            clockContainer.insertBefore(clockCard, addClockElement.parentNode);
        } else {
            clockContainer.appendChild(clockCard);
        }

        setInterval(() => updateTime(timeDisplay, timeZoneSelector.value), 1000);
        updateTime(timeDisplay, timezone);
    }

    document.addEventListener('DOMContentLoaded', () => {
        addClock();
        addClock();

        const addClockCard = document.createElement('div');
        addClockCard.className = 'card clock-card add-clock';
        addClockCard.innerText = '+ Add another clock';
        addClockCard.addEventListener('click', () => {
            addClock();
        });

        const addClockWrapper = document.createElement('div');
        addClockWrapper.className = 'card';
        addClockWrapper.appendChild(addClockCard);

        const clockContainer = document.getElementById('clockContainer');

        if (clockContainer) {
            clockContainer.appendChild(addClockWrapper);
        } else {
            console.error('Clock container not found!');
        }
    });
