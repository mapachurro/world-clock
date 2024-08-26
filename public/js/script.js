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
    { label: 'America/Santiago', value: 'America/Santiago', name: 'Santiago, Chile' },
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
    { label: 'Australia/Sydney', value: 'Australia/Sydney', name: 'Sydney, Australia' },
    { label: 'Australia/Melbourne', value: 'Australia/Melbourne', name: 'Melbourne, Australia' },
    { label: 'Australia/Brisbane', value: 'Australia/Brisbane', name: 'Brisbane, Australia' },
    { label: 'Australia/Adelaide', value: 'Australia/Adelaide', name: 'Adelaide, Australia' },
    { label: 'Australia/Perth', value: 'Australia/Perth', name: 'Perth, Australia' },
    { label: 'Australia/Hobart', value: 'Australia/Hobart', name: 'Hobart, Australia' }
    // You can add more time zones here as needed
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
